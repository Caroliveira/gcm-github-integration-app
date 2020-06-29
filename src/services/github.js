import axios from "axios";
const base = "https://api.github.com";

export async function getUserRepo(user) {
  try {
    const res = await axios.get(`${base}/users/${user}/repos`, {
      headers: { Accept: "application/vnd.github.nebula-preview+json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status),
    };
  }
}

export async function getOrgRepo(org) {
  try {
    const res = await axios.get(`${base}/orgs/${org}/repos`, {
      headers: { Accept: "application/vnd.github.nebula-preview+json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status),
    };
  }
}

export async function getRepoContributors(owner, repo) {
  try {
    const res = await axios.get(`${base}/repos/${owner}/${repo}/contributors`, {
      headers: { Accept: "application/vnd.github.nebula-preview+json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      message: errorHandler(error.response.status),
    };
  }
}

export async function getRepoOpenPullRequests(owner, repo) {
  try {
    const res = await axios.get(`${base}/repos/${owner}/${repo}/pulls`, {
      headers: { Accept: "application/vnd.github.sailor-v-preview+json" },
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
