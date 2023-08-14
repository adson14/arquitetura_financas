package domain

import "github.com/adson14/arquitetura_financas-reports/dto"

type TransactionRepository interface {
	Search(reportID string, accountID string, initDate string, endDate string) (dto.SearchResponse, error)
}
