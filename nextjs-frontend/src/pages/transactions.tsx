import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

import { Container, Typography } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';

const columns: GridColDef[] = [
  { field: 'payment_date', headerName: 'Data Pagamento', type:'date', width: 150},
  { field: 'name', headerName: 'Nome',width: 250},
  { field: 'category', headerName: 'Categoria',width: 200 },
  { field: 'type', headerName: 'Operação',width: 200 },
  { field: 'created_at', headerName: 'Criado em', type:'date', width: 150,},
];

const TransactionsPage: NextPage = (props: any) => {
  return (
    <Container>
        <Typography component="h1" variant='h4'>
            MInhas TRansações
        </Typography>
        <DataGrid 
        autoHeight rows={[]} 
        columns={columns} 
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        />
    </Container>
  )
}

export default TransactionsPage

export const getServerSideProps: GetServerSideProps = async() => {
  // posso chamar capi, database ... tudo de um lado do servidor
  return{
    props: {
      name: 'Adson'
    }
  }
};
