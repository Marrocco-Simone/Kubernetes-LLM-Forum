import { postgres } from "./deps.js";
const PGPASS = Deno.env.get("PGPASS").trim();
const [host, port, database, username, password] = PGPASS.split(":");

const sql = postgres({
  host,
  port,
  database,
  username,
  password,
});

export { sql };
