package dto

type SearchResponse struct {
	ReportID  string `-`
	AccountID string `-`
	InitDate  string `-`
	EndDate   string `-`
	Hits      struct {
		Total struct {
			Value int64 `json:"value"`
		} `json:"total"`

		Hits []*struct {
			Source *Transaction `json:"_source"`
		} `json:"hits"`
	} `json:"hits"`
}

type Transaction struct {
	ID          string  `json:"_id"`
	AccountID   string  `json:"account_id"`
	Category    string  `json:"category"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Type        string  `json:"type"`
	Amount      float64 `json:"amount"`
	PaymentDate int64   `json:"payment_date"`
}
