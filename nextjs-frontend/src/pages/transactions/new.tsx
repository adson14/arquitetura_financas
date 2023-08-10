import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
  Container,
} from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "./../../utils/model";
import { useAuth } from "../../context/AuthContext";
import { Token, validateAuth } from "../../utils/auth";
import { http } from "../../utils/http";

const TransactionsNewPage: NextPage = (props:any) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  async function onSubmit(data: any) {
    try {
      await http.post("transactions", data ,{
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      });
      router.push("/transactions");
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
          <Typography component="h1" variant="h4">
            Nova transação
          </Typography>
        </Box>
      <Box display="flex" padding={1} marginTop={5}  >
       
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={6}>
              
              <TextField
                {...register("payment_date")}
                type="date"
                required
                label="Data pagamento"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                {...register("name")}
                label="Nome"
                required
                fullWidth
                inputProps={{ maxLength: 255 }}
              />
              <TextField
                {...register("description")}
                label="Descrição"
                required
                fullWidth
              />
              <TextField
                {...register("category")}
                select
                required
                label="Categoria"
                fullWidth
              >
                {TransactionCategoryLabels.map((i, key) => (
                  <MenuItem key={key} value={i.value}>
                    {i.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...register("amount", { valueAsNumber: true })}
                required
                type="number"
                label="Valor"
                fullWidth
              />
              <TextField
                {...register("type")}
                select
                required
                label="Tipo de operação"
                fullWidth
              >
                {TransactionTypeLabels.map((i, key) => (
                  <MenuItem key={key} value={i.value}>
                    {i.label}
                  </MenuItem>
                ))}
              </TextField>
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
        </form>
      </Box>
    </Container>
  ) : null;
};

export default TransactionsNewPage;

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
  //const token = getAccessTokenFromCookie();
};