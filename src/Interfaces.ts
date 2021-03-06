import * as jsonschema from "jsonschema";

export interface IGenericJSON { [key: string]: any; }
export type IGenericExecFunc = (value?: any) => any;
export type IGenericCallbackFunc = (error: Error, value?: any) => any;

/////////////////////////////////////////////////////////////////////
// Configuration Interfaces
/////////////////////////////////////////////////////////////////////

export interface IConfigCommon {
    environment: string;
    isProduction: boolean;
    wikifier: {
        wikifierURL: string;
        userKey: string;
    }
    ttp: {
        user: string;
        token: string;
    }
}

export interface IConfigEnvironment {
    elasticsearch: {
        node: string;
    }
    kafka: {
        host: string;
        groupId: string;
    }
    pg: {
        host: string;
        port: number;
        database: string;
        max: number;
        idleTimeoutMillis: number;
        user: string;
        password: string;
        schema: string;
        version: string;
    }
}

export interface IConfiguration {
    environment?: string;
    isProduction?: boolean;
    wikifier?: {
        wikifierURL: string;
        userKey: string;
    }
    ttp?: {
        user: string;
        token: string;
    }
    elasticsearch: {
        node: string;
    }
    kafka: {
        host: string;
        groupId: string;
    }
    pg: {
        host: string;
        port: number;
        database: string;
        max: number;
        idleTimeoutMillis: number;
        user: string;
        password: string;
        schema: string;
        version: string;
    }
}

/////////////////////////////////////////////////////////////////////
// Kafka Interfaces
/////////////////////////////////////////////////////////////////////

export interface IKafkaConsumerParams {
    host: string;
    topic: string;
    groupId: string;
    high_water: number;
    low_water: number;
}

/////////////////////////////////////////////////////////////////////
// Languages Interfaces
/////////////////////////////////////////////////////////////////////

export enum ILanguageTypes {
    FULLNAME = "fullname",
    ALPHA2 = "alpha2",
    ALPHA3 = "alpha3"
}

/////////////////////////////////////////////////////////////////////
// PostgreSQL Interfaces
/////////////////////////////////////////////////////////////////////

export interface IPostgreSQLParams {
    user: string;
    database: string;
    password: string;
    host: string;
    port: number;
    max: number;
    idleTimeoutMillis: number;
}

export type IPostgreSQLBatchCallbackFunc = (error: Error, rows: any[], callback: IGenericCallbackFunc) => void;

/////////////////////////////////////////////////////////////////////
// JSON Validator Interfaces
/////////////////////////////////////////////////////////////////////

export interface IValidatorSchemas {
    [key:string]: jsonschema.Schema;
}

/////////////////////////////////////////////////////////////////////
// Wikifier Interfaces
/////////////////////////////////////////////////////////////////////

export interface IWikifierParams {
    user_key: string;
    wikifier_url?: string;
    max_length?: number;
}

export interface IWikiDataClass {
    itemID: string;
    [key: string]: string;
}

export interface IWikifierSupport {
    wFrom: number;
    wTo: number;
    chFrom: number;
    chTo: number;
    pMentionGivenSurface: number;
    pageRank: number;
}

export interface IWikifierAnnotation {
    title: string;
    url: string;
    lang: string;
    pageRank: number;
    cosine: number;
    secLang?: string;
    secTitle?: string;
    secUrl?: string;
    wikiDataClasses: IWikiDataClass[];
    wikiDataClassIds: string[];
    dbPediaTypes: string[];
    dbPediaIri: string;
    supportLen: number;
    support: IWikifierSupport[];
}

export interface IWikifierConcept {
    uri: string;
    name: string;
    secUri: string;
    secName: string;
    lang: string;
    wikiDataClasses: IWikiDataClass[];
    cosine: number;
    pageRank: number;
    dbPediaIri: string;
    supportLen: number;
}

export interface IWikifierResponse {
    annotations: IWikifierAnnotation[];
    spaces: string[];
    words: string[];
    [key: string]: any;
}

export type IWikifierTaskFunc = (error: Error, concepts: IWikifierConcept[]) => any;
export type IWikifierCreateTaskFunc = (callback: IWikifierTaskFunc) => Promise<any>;

export interface IWikifierExtract {
    wikipedia: IWikifierConcept[];
    language: string;
}

export interface IWikifierConceptMapping {
    [key: string]: IWikifierConcept;
}

/////////////////////////////////////////////////////////////////////
// Bolt interfaces
/////////////////////////////////////////////////////////////////////

import * as qtolopology from "qtopology";

///////////////////////////////////////
// Doc Type Bolt
///////////////////////////////////////

export interface IDocTypeBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    document_location_path: string;
    document_type_path: string;
    document_error_path?: string;
}

///////////////////////////////////////
// OCR Bolt
///////////////////////////////////////

export interface IOcrBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    document_location_path: string;
    document_location_type?: string;
    document_language_path: string;
    document_ocr_path: string;
    ocr_data_folder?: string;
    ocr_verbose?: boolean;
    document_error_path?: string;
    temporary_folder: string;
}

///////////////////////////////////////
// PDF Bolt
///////////////////////////////////////

export enum IPdfMetadata {
    PAGES = "pages",
    INFO = "info",
    METADATA = "metadata",
    TEXT = "text"
}

export interface IPdfBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    document_location_path: string;
    document_pdf_path: string;
    document_error_path?: string;
    document_location_type?: string;
    pdf_extract_metadata?: IPdfMetadata[];
    pdf_trim_text?: boolean;
    convert_to_pdf?: boolean;
}

///////////////////////////////////////
// Text Bolt
///////////////////////////////////////

export interface ITextractConfig {
    preserveLineBreaks?: boolean;
    preserveOnlyMultipleLineBreaks?: boolean;
    includeAltText?: boolean;
}

export interface ITextBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    document_location_path: string;
    document_text_path: string;
    document_error_path?: string;
    document_location_type?: string;
    textract_config?: {
        preserve_line_breaks?: boolean;
        preserve_only_multiple_line_breaks?: boolean;
        include_alt_text?: boolean;
    }
}

///////////////////////////////////////
// TTP
///////////////////////////////////////

export interface ITTPLanguageText {
    [key: string]: {
        tlpath?: { "l": string }[]
    };
}

export interface ITTPLanguageVideo {
    [key: string]: {
        sub: {
            tlpath?: {"l": string }[]
        }
    };
}

export interface ITTPIngestNewResponse {
    rcode: number;
    id: string;
}

///////////////////////////////////////
// Text TTP Bolt
///////////////////////////////////////

export interface ITextTTPBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    ttp: {
        user: string;
        token: string;
        url?: string;
        languages: ITTPLanguageText;
        formats: {
            [key: number]: string;
        }
        timeout_millis: number;
    }
    temporary_folder: string;
    document_language_path: string;
    document_title_path: string;
    document_text_path: string;
    document_transcriptions_path: string;
    document_error_path?: string;
    ttp_id_path: string;
}

///////////////////////////////////////
// Video TTP Bolt
///////////////////////////////////////

export interface IVideoTTPBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    ttp: {
        user: string;
        token: string;
        url?: string;
        languages: ITTPLanguageVideo;
        formats: {
            [key: number]: string;
        }
        timeout_millis: number;
    }
    document_language_path: string;
    document_location_path: string;
    document_authors_path: string;
    document_title_path: string;
    document_text_path: string;
    document_transcriptions_path: string;
    document_error_path?: string;
    ttp_id_path: string;
}

export type IExtractTTPStatusFunc = (id: string) => Promise<{
        process_completed: boolean;
        status_info: string;
        process_id: string;
        status_code: number;
    }>

export interface IExtractTTPStatus {
    status_code: number;
    status_info: string;
}

///////////////////////////////////////
// Wikipedia Bolt
///////////////////////////////////////

export interface IWikipediaBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    wikifier: {
        user_key: string;
        wikifier_url?: string;
        max_length?: number;
    }
    document_text_path: string;
    wikipedia_concept_path: string;
    document_error_path?: string;
}

///////////////////////////////////////
// Kafka Bolt
///////////////////////////////////////

export type IFormatMessage = (message: IGenericJSON) => IGenericJSON;

export interface IKafkaBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    kafka: {
        host: string;
        topic: string;
    }
    format_message?: IFormatMessage
}

///////////////////////////////////////
// Log PostgreSQL Bolt
///////////////////////////////////////

export interface ILogPostgreSQLBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    pg: {
        host: string;
        port: number;
        database: string;
        max: number;
        idleTimeoutMillis: number;
        user: string;
        password: string;
        schema: string;
        version: string;
    }
    postgres_table: string;
    postgres_method?: string;
    postgres_primary_id: string;
    postgres_message_attrs?: IGenericJSON;
    postgres_time_attrs?: IGenericJSON;
    postgres_literal_attrs?: IGenericJSON;
    message_primary_id: string;
    final_bolt?: boolean;
    document_error_path?: string;
}

///////////////////////////////////////
// Validate Bolt
///////////////////////////////////////

export interface IValidateBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    json_schema: jsonschema.Schema;
    document_error_path?: string;
}

///////////////////////////////////////
// Store XXXXXXXXXXX
///////////////////////////////////////

export interface IStorePostgreSQLTemplateConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    pg: {
        host: string;
        port: number;
        database: string;
        max: number;
        idleTimeoutMillis: number;
        user: string;
        password: string;
        schema: string;
        version: string;
    },
    final_bolt?: boolean;
    document_error_path?: string;
}

///////////////////////////////////////
// Wikipedia Bolt
///////////////////////////////////////

export interface IWikipediaBoltConfig {
    onEmit?: qtolopology.BoltEmitCallbackAsync;
    wikifier: IWikifierParams;
    document_text_path: string;
    wikipedia_concept_path: string;
    document_error_path?: string;
}