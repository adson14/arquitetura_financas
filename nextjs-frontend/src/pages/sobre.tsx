import type { GetServerSideProps, NextPage } from 'next'


const Sobre: NextPage = (props: any) => {
  return (
    <div>
      <h1>Bem vindo</h1>
      <div>{props.name}</div>

    </div>
  )
}

export default Sobre

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  // posso chamar capi, database ... tudo de um lado do servidor
  return{
    props: {
      name: 'Adson'
    }
  }
};
