export interface UrlResponse {
  event: 'getUrlResponse';
  url: string;
}

export interface GoToPageResponse {
  event: 'GoToPageResponse';
  url: string;
}

export interface ClickResponse {
  event: 'ClickResponse';
  clickResponse?: object;
  error?: object;
  script?: string;
}

export interface TypeResponse {
  event: 'typeResponse';
  typeResponse?: object;
  error?: object;
  script?: string;
}

export interface SearchResponse {
  event: 'searchResponse';
  typeResponse?: object;
  error?: object;
  script?: string;
}

export interface ScrollResponse {
  event: 'scrollResponse';
  scrollScript: string;
}

export interface HtmlReceived {
  event: 'htmlReceived';
  htmlResponse: string;
}

export interface GetMarkdownResponse {
  event: 'getMarkdownResponse';
  markdown: string;
}

export interface GetContentResponse {
  event: 'getContentResponse';
  markdown: string;
}

export interface ExtractTextResponse {
  event: 'extractTextResponse';
  text: string;
}
