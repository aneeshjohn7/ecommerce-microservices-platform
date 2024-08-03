import axios from "axios";
import { config } from "../config/env";

const catalogClient = axios.create({
  baseURL: config.services.catalogServiceUrl,
  timeout: 5000,
});

export default catalogClient;