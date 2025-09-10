import { server } from "./app.ts";

const start = async () => {
  try {
    const port = 3333;
    await server.listen({ port });
    console.log(`O servidor está rodando em http://localhost:${port}`);
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
