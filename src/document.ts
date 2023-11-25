import VendusClient, { type Boolean } from ".";

export type Document = {
  register_id?: string;
  type: DocumentType;
  discount_code?: string;
  discount_amount?: string;
  discount_percentage?: string;
  date_due?: string;
  payments: Payment[];
  mode?: "normal" | "tests";
  date?: string;
  date_supply?: string;
  notes?: string;
  ncr_id?: string;
  external_reference?: string;
  stock_operation?: "in" | "none" | "out";
  ifthenpay?: Boolean;
  eupago?: Boolean;
  multibanco?: Multibanco;
  client?: Client;
  supplier: Supplier;
  items: Item[];
  movement_of_goods: MovementOfGoods;
  print_discount?: Boolean;
  output?: "pdf" | "html" | "escpos" | "tpasibs";
  output_template_id?: number;
  tx_id?: string;
  errors_full?: Boolean;
  rest_room?: number;
  rest_table?: number;
  occupation?: number;
  stamp_retention_amount?: string;
  irc_retention_id?: string;
  related_document_id?: number;
  return_qrcode?: number;
};

export type DocumentType =
  | "FT" // Fatura
  | "FS" // Fatura Simplificada
  | "FR" // Fatura Recibo
  | "NC" // Nota de Crédito
  | "DC" // Consulta de Mesa
  | "PF" // Fatura Pró-Forma
  | "OT" // Orçamento
  | "EC" // Encomenda
  | "GA" // Guia de Ativos Próprios
  | "GT" // Guia de Transporte
  | "GR" // Guia de Remessa
  | "GD" // Guia de Devolução
  | "RG"; // Recibo

export type Payment = {
  id: number;
  amount: string;
  date_due?: string;
};

export type Multibanco = {
  entity: string;
  reference: string;
  amount: string;
};

export type Client = {
  id?: string;
  fiscal_id: string;
  name?: string;
  address?: string;
  postalcode?: string;
  city?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  notes?: string;
  country?: string;
  external_reference?: string;
  send_email?: string;
  billing_email?: string;
  irs_retention?: string;
};

export type Supplier = {
  id?: string;
  fiscal_id?: string;
  name?: string;
  address?: string;
  postalcode?: string;
  city?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  country?: string;
  obs?: string;
};

export type Item = {
  id?: string;
  reference?: string;
  gross_price?: string;
  supply_price?: string;
  qty: string;
  type_id?: ItemType;
  variant_id?: string;
  title?: string;
  unit_id?: string;
  category_id?: string;
  brand_id?: string;
  discount_amount?: string;
  discount_percentage?: string;
  stock_control?: string;
  stock_type?: StockType;
  tax_id?: TaxId;
  tax_exemption?: TaxExemption;
  tax_exemption_law?: string;
  tax_custom?: TaxCustom;
  reference_document?: ReferenceDocument;
  text?: string;
  serial?: string;
};

export type ItemType =
  | "P" // Produto
  | "S" // Serviço
  | "O" // Outro (portes, adiantamentos, etc.)
  | "I" // Imposto (excepto IVA e IS) ou Encargo Parafiscal
  | "E"; // Imposto Especial de Consumo (IABA, ISP e IT)

export type StockType =
  | "M" // Mercadorias
  | "P" // Matérias primas, subsidiárias ou de consumo
  | "A" // Produtos acabados ou intermédios
  | "S" // Subprodutos, deperdícios ou refugos
  | "T"; // Produtos e trabalhos em curso

export type TaxId =
  | "NOR" // Taxa Normal
  | "INT" // Taxa Intermédia
  | "RED" // Taxa Reduzida
  | "ISE" // Isento
  | "OUT"; // Outros

export type TaxExemption =
  | "M01" // Artigo 16.º, n.º 6 do CIVA ou similar
  | "M02" // Artigo 6.º do Decreto-Lei n.º 198/90, de 19 de Junho
  | "M03" // Exigibilidade de caixa (revogado)
  | "M04" // Artigo 13.º do CIVA ou similar
  | "M05" // Artigo 14.º do CIVA ou similar
  | "M06" // Artigo 15.º do CIVA ou similar
  | "M07" // Artigo 9.º do CIVA ou similar
  | "M08" // IVA - autoliquidação (revogado)
  | "M09" // IVA - não confere direito a dedução
  | "M10" // IVA - Regime de isenção (Artigo 57.º do CIVA)
  | "M11" // Regime particular do tabaco
  | "M12" // Regime da margem de lucro - Agências de viagens
  | "M13" // Regime da margem de lucro - Bens em segunda mão
  | "M14" // Regime da margem de lucro - Objetos de arte
  | "M15" // Regime da margem de lucro - Objetos de coleção e antiguidades
  | "M16" // Artigo 14.º do RITI ou similar
  | "M19" // Outras isenções
  | "M20" // IVA - regime forfetário
  | "M21" // IVA – não confere direito à dedução
  | "M25" // Mercadorias à consignação
  | "M26" // Cabaz alimentar
  | "M30" // IVA - autoliquidação (2.1.i)
  | "M31" // IVA - autoliquidação (2.1.j)
  | "M32" // IVA - autoliquidação (2.1.l)
  | "M33" // IVA - autoliquidação (2.1.m)
  | "M34" // IVA - autoliquidação (2.1.n)
  | "M40" // IVA - autoliquidação (6.6.a)
  | "M41" // IVA - autoliquidação (8.3.R)
  | "M42" // IVA - autoliquidação (21.2007)
  | "M43" // IVA - autoliquidação (362.99)
  | "M99"; // Não sujeito; não tributado ou similar

export type TaxCustom = {
  country?: string;
  rate: string;
  code: string;
  type: string;
};

export type ReferenceDocument = {
  document_number: string;
  document_row: string;
  reference_id: string;
  reference_relation: string;
};

export type MovementOfGoods = {
  vehicle_id: string;
  show_prices: string;
  loadpoint: Loadpoint;
  landpoint: Landpoint;
  invoices: Document[];
  print_discount: string;
  output: string;
  output_template_id: string;
  tx_id: string;
  errors_full: string;
  rest_room: string;
  rest_table: string;
  occupation: string;
  stamp_retention_amount: string;
  irc_retention_id: string;
  related_document_id: string;
  return_qrcode: string;
};

export type Loadpoint = {
  date: string;
  time: string;
  address: string;
  postalcode: string;
  city: string;
  country: string;
  store_id: string;
  changestock: string;
};

export type Landpoint = {
  is_global: string;
  date: string;
  time: string;
  address: string;
  postalcode: string;
  city: string;
  country: string;
  store_id: string;
  receivestock: string;
};

export type DocumentResponse = {
  id?: number;
  type?: DocumentType;
  subtype?: "G";
  tax_authority_id?: string;
  number?: string;
  date?: string;
  date_supply?: string;
  system_time?: string;
  local_time?: string;
  amount_gross?: string;
  amount_net?: string;
  hash?: string;
  atcud?: string;
  output?: string;
  qrcode?: string;
  qrcode_data?: string;
};

export default class DocumentApi {
  #client: VendusClient;

  constructor({ client }: { client: VendusClient }) {
    this.#client = client;
  }

  async createDocument(document: Document): Promise<DocumentResponse> {
    const response = await this.#client.request({
      endpoint: "documents",
      body: {
        ...document,
      },
      headers: this.#client.authenticationHeader(),
      method: "POST",
    });

    return response;
  }
}
