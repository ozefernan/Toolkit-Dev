import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const FIRST_NAMES = [
  "João",
  "Maria",
  "José",
  "Ana",
  "Pedro",
  "Paula",
  "Carlos",
  "Juliana",
  "Lucas",
  "Fernanda",
  "Rafael",
  "Mariana",
  "Felipe",
  "Camila",
  "Bruno",
  "Beatriz",
  "Gustavo",
  "Larissa",
  "Rodrigo",
  "Amanda",
];

const LAST_NAMES = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Rodrigues",
  "Ferreira",
  "Alves",
  "Pereira",
  "Lima",
  "Gomes",
  "Costa",
  "Ribeiro",
  "Martins",
  "Carvalho",
  "Rocha",
  "Almeida",
  "Barbosa",
  "Araújo",
  "Dias",
  "Castro",
];

const DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com.br",
  "example.com.br",
];

const STREETS = [
  "Rua das Flores",
  "Avenida Paulista",
  "Rua dos Três Irmãos",
  "Avenida Brasil",
  "Rua Augusta",
  "Rua do Comércio",
  "Avenida Atlântica",
  "Rua Sete de Setembro",
  "Avenida Getúlio Vargas",
  "Rua Quinze de Novembro",
];

const CITIES = [
  { city: "São Paulo", state: "SP" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
  { city: "Brasília", state: "DF" },
  { city: "Curitiba", state: "PR" },
  { city: "Porto Alegre", state: "RS" },
  { city: "Salvador", state: "BA" },
  { city: "Fortaleza", state: "CE" },
  { city: "Recife", state: "PE" },
  { city: "Manaus", state: "AM" },
];

export function FakeDataGenerator() {
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const generateCPF = () => {
    const randomDigit = () => Math.floor(Math.random() * 10);
    const cpf = Array.from({ length: 9 }, randomDigit);

    // Calculate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += cpf[i] * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    digit1 = digit1 >= 10 ? 0 : digit1;
    cpf.push(digit1);

    // Calculate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += cpf[i] * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    digit2 = digit2 >= 10 ? 0 : digit2;
    cpf.push(digit2);

    return `${cpf.slice(0, 3).join("")}.${cpf.slice(3, 6).join("")}.${cpf
      .slice(6, 9)
      .join("")}-${cpf.slice(9).join("")}`;
  };

  const generateRG = () => {
    const digits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10)
    );
    return `${digits.slice(0, 2).join("")}.${digits
      .slice(2, 5)
      .join("")}.${digits.slice(5, 8).join("")}-${digits[8]}`;
  };

  const generateName = () =>
    `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${
      LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    }`;

  const generateEmail = (name: string) => {
    const cleanName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(" ", ".");
    return `${cleanName}@${
      DOMAINS[Math.floor(Math.random() * DOMAINS.length)]
    }`;
  };

  const generatePhone = () => {
    const ddd = Math.floor(Math.random() * 90) + 10; // DDD between 10-99
    const firstDigit = 9; // Mobile phones start with 9
    const rest = Math.floor(Math.random() * 90000000) + 10000000;
    const phoneStr = rest.toString();
    return `(${ddd}) ${firstDigit}${phoneStr.slice(0, 4)}-${phoneStr.slice(4)}`;
  };

  const generateAddress = () => {
    const location = CITIES[Math.floor(Math.random() * CITIES.length)];
    const number = Math.floor(Math.random() * 9000) + 100;
    const cep = `${Math.floor(Math.random() * 90000) + 10000}-${
      Math.floor(Math.random() * 900) + 100
    }`;

    return {
      street: `${
        STREETS[Math.floor(Math.random() * STREETS.length)]
      }, ${number}`,
      neighborhood: "Centro",
      city: location.city,
      state: location.state,
      cep,
    };
  };

  const generate = () => {
    const name = generateName();
    const address = generateAddress();

    setData({
      name,
      cpf: generateCPF(),
      rg: generateRG(),
      email: generateEmail(name),
      phone: generatePhone(),
      address,
      birthdate: `${Math.floor(Math.random() * 28) + 1}/${
        Math.floor(Math.random() * 12) + 1
      }/${Math.floor(Math.random() * 40) + 1970}`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Fake Data Generator (BR)
              </h1>
              <p className="text-sm text-slate-400">
                Generate fake data for Brazil
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={generate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 w-full justify-center mb-6"
        >
          <RefreshCw className="w-4 h-4" />
          Gerar Dados
        </button>

        {data && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300">
                Dados Gerados
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-300"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy JSON
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Nome Completo:
                  </span>
                  <p className="text-slate-100 font-medium">{data.name}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    Data de Nascimento:
                  </span>
                  <p className="text-slate-100 font-mono text-sm">
                    {data.birthdate}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">
                    CPF:
                  </span>
                  <p className="text-slate-100 font-mono text-sm">{data.cpf}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">RG:</span>
                  <p className="text-slate-100 font-mono text-sm">{data.rg}</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-xs text-slate-500 block mb-1">
                  Email:
                </span>
                <p className="text-slate-100 font-mono text-sm break-all">
                  {data.email}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-1">
                  Telefone:
                </span>
                <p className="text-slate-100 font-mono text-sm">{data.phone}</p>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-xs text-slate-500 block mb-2">
                  Endereço:
                </span>
                <div className="space-y-1">
                  <p className="text-slate-100 text-sm">
                    {data.address.street}
                  </p>
                  <p className="text-slate-100 text-sm">
                    {data.address.neighborhood}
                  </p>
                  <p className="text-slate-100 text-sm">
                    {data.address.city} - {data.address.state}
                  </p>
                  <p className="text-slate-100 font-mono text-sm">
                    CEP: {data.address.cep}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
