package usecase

import (
	"encoding/json"
	"os"
	"strconv"
	"text/template"
	"time"

	"github.com/adson14/arquitetura_financas-reports/dto"
	"github.com/adson14/arquitetura_financas-reports/infra/kafka"
	"github.com/adson14/arquitetura_financas-reports/infra/repository"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func GenerateReport(requestJson []byte, repository repository.TransactionElasticSearchRepository) error {
	var requestReport dto.RequestReport

	//Serialize the data
	err := json.Unmarshal(requestJson, &requestReport)

	if err != nil {
		return err
	}

	//Search data
	data, err := repository.Search(requestReport.ReportID, requestReport.AccountID, requestReport.InitDate, requestReport.EndDate)

	if err != nil {
		return err
	}

	//Generate report file
	result, err := generateReportFile(data)

	if err != nil {
		return err
	}

	//Publish report on Kafka
	err = publishMessage(data.ReportID, string(result), "complete")

	if err != nil {
		return err
	}

	//Remove file local
	err = os.Remove("storage/" + requestReport.ReportID + ".html")

	if err != nil {
		return err
	}

	return nil

}

func generateReportFile(data dto.SearchResponse) ([]byte, error) {
	f, err := os.Create("storage/" + data.ReportID + ".html")

	if err != nil {
		return nil, err
	}

	funcMap := template.FuncMap{
		"format": func(timestamp int64) string {
			t := time.Unix(timestamp, 0)
			return t.Format("02/01/2006")
		},
	}

	//t := template.Must(template.New("report.html").ParseFiles("template/report.html"))

	t, err := template.New("report.html").Funcs(funcMap).ParseFiles("template/report.html")

	if err != nil {
		return nil, err
	}

	for _, hit := range data.Hits.Hits {
		hit.Source.PaymentDate = time.Unix(hit.Source.PaymentDate, 0).Unix()
	}

	err = t.Execute(f, data)

	if err != nil {
		return nil, err
	}

	//Upload to S3
	result, err := uploadReport(data)

	if err != nil {
		return nil, err
	}

	return []byte(result), nil
}

func uploadReport(data dto.SearchResponse) (string, error) {
	// create new session
	sess := session.Must(session.NewSession())
	svc := s3.New(sess)

	uploader := s3manager.NewUploader(sess)

	// read file
	fo, err := os.Open("storage/" + data.ReportID + ".html")

	if err != nil {
		return "", err
	}

	// upload file
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(os.Getenv("S3Bucket")),
		Key:    aws.String(data.ReportID + ".html"),
		Body:   fo,
	})

	if err != nil {
		return "", err
	}

	// get information
	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(os.Getenv("S3Bucket")),
		Key:    aws.String(data.ReportID + ".html"),
	})

	// Time to live of the file
	reportTTL, err := strconv.ParseInt(os.Getenv("ReportTTL"), 10, 64)

	if err != nil {
		return "", err
	}

	// get url to presign
	urlStr, err := req.Presign(time.Duration(reportTTL) * time.Hour)

	if err != nil {
		return "", err
	}

	return urlStr, nil
}

func publishMessage(reportID string, fileURL string, status string) error {
	reponseReport := dto.ResponseReport{
		ID:      reportID,
		FileURL: fileURL,
		Status:  status,
	}

	//Convert to JSON
	reponseJSON, err := json.Marshal(reponseReport)

	if err != nil {
		return err
	}

	// connection to ElasticSearch
	producer := kafka.NewKafkaProducer()
	producer.SetupProducer(os.Getenv("KafkaBootstrapServers"))
	err = producer.Publish(string(reponseJSON), os.Getenv("KafkaProducerTopic"))

	if err != nil {
		return err
	}

	return nil

}
