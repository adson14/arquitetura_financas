import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { Container, Typography } from '@mui/material';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Token, validateAuth } from '../utils/auth';
import { http } from '../utils/http';
import { Transaction } from '../utils/model';


interface TransactionsPageProps  {
  transactions: Transaction[]
}

const columns: GridColDef[] = [
  { field: 'payment_date', headerName: 'Data Pagamento', width: 150},
  { field: 'name', headerName: 'Nome',width: 250},
  { field: 'category', headerName: 'Categoria',width: 200 },
  { field: 'type', headerName: 'Operação',width: 200 },
  { field: 'created_at', headerName: 'Criado em', width: 150,},
];

const TransactionsPage: NextPage <TransactionsPageProps> = (props: any) => {
  return (
    <Container>
        <Typography component="h1" variant='h4'>
            MInhas TRansações
        </Typography>
        <DataGrid 
        rows={props.transactions}
        autoHeight
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

export const getServerSideProps: GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
  // posso chamar capi, database ... tudo de um lado do servidor
  const auth = validateAuth(ctx.req)
  if(!auth){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const token = (auth as Token).token;

  const {data: transactions} = await http.get('transactions',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  console.log(transactions)
  return {
    props: {
      transactions
    }
  }
  //const token = getAccessTokenFromCookie();
};
