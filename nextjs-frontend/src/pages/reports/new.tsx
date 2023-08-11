import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Token, validateAuth } from "../../utils/auth";
import { http } from "../../utils/http";

const ReportsNewPage: NextPage = (props:any) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  async function onSubmit(data: any) {
    try {
      await http.post("reports", data ,{
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      });
      router.push("/reports");
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== "undefined" &&
    !props.autenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return props.autenticated ? (
    <Container>
        <Box marginTop={5}>
          <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
            Novo relatório
          </Typography>
        </Box>
        <Typography  component="h2" variant="h6" color="textPrimary" gutterBottom>
            Solicitação
          </Typography>
      <Box display="flex" padding={1} marginTop={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12} marginBottom={2}>
                    <TextField
                      {...register("start_date")}
                      type="date"
                      required
                      label="Início"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("end_date")}
                      type="date"
                      required
                      label="Fim"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box marginTop={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Salvar
                    </Button>
                  </Box>
                </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  ) : null;
};

export default ReportsNewPage;

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

  return {
    props: {
      token,
      autenticated: auth
    }
  }
};