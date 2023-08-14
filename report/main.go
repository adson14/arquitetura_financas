package main

import (
	"fmt"
	"log"

	"github.com/adson14/arquitetura_financas-reports/infra/kafka"
	"github.com/adson14/arquitetura_financas-reports/infra/repository"
	"github.com/adson14/arquitetura_financas-reports/usecase"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/elastic/go-elasticsearch/v8"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	// connection to ElasticSearch
	client, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{"http://host-local.docker.internal:9200"},
	})

	if err != nil {
		log.Fatal("Error connection to ElasticSearch")
	}

	// connection to repository
	repo := repository.TransactionElasticSearchRepository{
		Client: *client,
	}

	msgChan := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(msgChan)

	go consumer.Consume()

	for msg := range msgChan {
		err := usecase.GenerateReport(msg.Value, repo)

		if err != nil {
			fmt.Println(err)
		}
	}
}
