import { Column } from '@devexpress/dx-react-grid';
import { Container, Typography } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next'


const columns : Column[] = [
    
]

const TransactionsPage: NextPage = (props: any) => {
  return (
    <Container>
        <Typography component="h1" variant='h4'>
            MInhas TRansações
        </Typography>
     

    </Container>
  )
}

export default TransactionsPage

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  // posso chamar capi, database ... tudo de um lado do servidor
  return{
    props: {
      name: 'Adson'
    }
  }
};
