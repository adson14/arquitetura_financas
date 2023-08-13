import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { Box, Button,Container,Link,Typography } from '@mui/material';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Token, validateAuth } from '../../utils/auth';
import { http } from '../../utils/http';
import { AddCircleOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuthSwr } from '../../../hooks/useAuthSwr';


const columns: GridColDef[] = [
  { 
    field: 'start_date', headerName: 'Inicio', width: 150, valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString(); // Formata a data como string
    }
  },
  { 
    field: 'end_date', headerName: 'Fim', width: 150, valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString(); // Formata a data como string
    }
  },
  { field: 'status', headerName: 'Status',width: 250},
  { field: 'file_url', headerName: 'Download',width: 200,
    renderCell: (params) => ( (params.value) ?
      <Link href={params.value} target="_blank" rel="noopener noreferrer">
        Download
      </Link>
      : null
  ) 
  },
  { 
    field: 'created_at', headerName: 'Criado em', width: 150,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString(); // Formata a data como string
    }
  },
];

const ReportsListPage:  NextPage<{ reports: any }>  = (props: any) => {
  const router = useRouter();
  const { data, error } = useAuthSwr("reports", {
    refreshInterval: 20000,
    fallbackData: props.reports,
  });
  return (
    <Container>
        <Typography component="h1" variant='h4'>
          Relatórios
        </Typography>

        <Box marginTop={5}>
            <Button
            startIcon={<AddCircleOutline />}
            variant={"contained"}
            color="primary"
            onClick={() => router.push("/reports/new")}
          >
            Criar
          </Button>
        </Box>
      <Box marginTop={5}>
        <DataGrid 
          rows={data}
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
      </Box>
    </Container>
  )
}

export default ReportsListPage

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

  const {data: reports} = await http.get('reports',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return {
    props: {
      reports
    }
  }
  //const token = getAccessTokenFromCookie();
};
