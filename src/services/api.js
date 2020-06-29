import axios from "axios";
const base = "http://localhost:3001";

export async function getRepositories() {
  try {
    const res = await axios.get(`${base}/repositories`, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status),
    };
  }
}

export async function saveRepository(repo) {
  try {
    const res = await axios.post(`${base}/repositories`, repo, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status),
    };
  }
}

function errorHandler(err) {
  const errors = {
    401: "Não autorizado",
    403: "Proibido",
    404: "Não encontrado",
    406: "Há campos inválidos",
    500: "Erro no servidor, tente novamente mais tarde.",
  };
  return errors[err] === undefined ? errors[500] : errors[err];
}
