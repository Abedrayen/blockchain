/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ResponseDto {
  data: object;
}

export interface UserDispoDTO {
  goingTo: string;
  startDay: string;
  endDay: string;
  startAt: string;
  endAt: string;
  comment: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  roleId?: number;
  companyName?: string;
  city?: string;
  country?: string;
  address?: string;
  websiteUrl?: string;
  commercialRegister?: string;
  patent?: string;
  companyTypeId?: number;
  userPackId?: number;
  carNumber: string;
  carWidth: number;
  carHeight: number;
  carWeight: number;
  disponibility: UserDispoDTO;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: object;
  refreshToken: object;
  user: object;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ResetPasswordReqDto {
  email: string;
}

export interface ResetPasswordDto {
  newPassword: string;
  resetPasswordToken: string;
}

export interface OrderRecipientDTO {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  streetAddress: string;
  secondAddress: string;
  zipCode: string;
  email: string;
}

export interface CreateOrderPackagesDTO {
  length: number;
  width: number;
  height: number;
  price: number;
}

export interface CreateOrderDto {
  description: string;
  totalWeight: number;
  totalWidth: number;
  totalHeight: number;
  totalPrice: number;
  shipmentPrice: number;
  deliveredByUserId: number;
  recipient: OrderRecipientDTO;
  packages: CreateOrderPackagesDTO[];
}

export interface UpdateOrderRecipientDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  country?: string;
  streetAddress?: string;
  secondAddress?: string;
  zipCode?: string;
  email?: string;
  id: number;
}

export interface UpdateCreateOrderPackagesDTO {
  length?: number;
  width?: number;
  height?: number;
  price?: number;
  id: number;
}

export interface UpdateOrderDto {
  description: string;
  totalWeight: number;
  totalWidth: number;
  totalHeight: number;
  totalPrice: number;
  shipmentPrice: number;
  orderStatusId: number;
  deliveredByUserId: number;
  recipient: UpdateOrderRecipientDTO;
  packages: UpdateCreateOrderPackagesDTO[];
}

export interface CreatePackageDto {
  length: number;
  width: number;
  height: number;
  price: number;
  orderId: number;
}

export interface UpdatePackageDto {
  length?: number;
  width?: number;
  height?: number;
  price?: number;
  orderId?: number;
}

export type CreateGeneratePdfDto = object;

export type UpdateGeneratePdfDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title TUNLOG
 * @version 1.0
 * @contact
 *
 * Tunlog apis
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  upload = {
    /**
     * No description
     *
     * @name AppControllerUploadFile
     * @summary Upload an image
     * @request POST:/upload
     * @secure
     */
    appControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @name AppControllerSeeUploadedFile
     * @summary Visualize uploaded file
     * @request GET:/files/{filepath}
     * @secure
     */
    appControllerSeeUploadedFile: (filepath: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files/${filepath}`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  companyTypes = {
    /**
     * No description
     *
     * @name AppControllerGetAllCompanyTypes
     * @request GET:/company-types
     */
    appControllerGetAllCompanyTypes: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/company-types`,
        method: 'GET',
        ...params,
      }),
  };
  article = {
    /**
     * No description
     *
     * @name ArticleControllerCreate
     * @request GET:/article
     */
    articleControllerCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/article`,
        method: 'GET',
        ...params,
      }),
  };
  mail = {
    /**
     * No description
     *
     * @tags mail
     * @name MailControllerCreate
     * @request GET:/mail
     * @secure
     */
    mailControllerCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mail`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserControllerCreate
     * @request POST:/user
     * @secure
     */
    userControllerCreate: (data: UserDTO, params: RequestParams = {}) =>
      this.request<ResponseDto, any>({
        path: `/user`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerFindAll
     * @request GET:/user
     * @secure
     */
    userControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerFindOne
     * @request GET:/user/{id}
     * @secure
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerUpdate
     * @request PATCH:/user/{id}
     * @secure
     */
    userControllerUpdate: (id: string, data: UserDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerRemove
     * @request DELETE:/user/{id}
     * @secure
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (data: UserDTO, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRefreshToken
     * @request POST:/auth/refresh-token
     * @secure
     */
    authControllerRefreshToken: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/refresh-token`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRequestPasswordReset
     * @request POST:/auth/request-reset-password-email
     */
    authControllerRequestPasswordReset: (data: ResetPasswordReqDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/request-reset-password-email`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResetPassword
     * @request POST:/auth/reset-password
     */
    authControllerResetPassword: (data: ResetPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/reset-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerGetAuthenticatedUser
     * @request GET:/auth/me
     * @secure
     */
    authControllerGetAuthenticatedUser: (params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerCreate
     * @request POST:/orders/create
     * @secure
     */
    ordersControllerCreate: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<ResponseDto, any>({
        path: `/orders/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerFindAll
     * @request GET:/orders/all-orders
     */
    ordersControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/all-orders`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerFindOne
     * @request GET:/orders/deatils/{id}
     */
    ordersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/deatils/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerUpdate
     * @request PATCH:/orders/update/{id}
     */
    ordersControllerUpdate: (id: string, data: UpdateOrderDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/update/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerRemove
     * @request DELETE:/orders/delete/{id}
     */
    ordersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/delete/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersControllerGetOrderStatuses
     * @request GET:/orders/statuses-list
     */
    ordersControllerGetOrderStatuses: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/statuses-list`,
        method: 'GET',
        ...params,
      }),
  };
  packages = {
    /**
     * No description
     *
     * @tags orders_packages
     * @name PackagesControllerCreate
     * @request POST:/packages
     */
    packagesControllerCreate: (data: CreatePackageDto, params: RequestParams = {}) =>
      this.request<ResponseDto, any>({
        path: `/packages`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders_packages
     * @name PackagesControllerFindAll
     * @request GET:/packages
     */
    packagesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/packages`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders_packages
     * @name PackagesControllerFindOne
     * @request GET:/packages/{id}
     */
    packagesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/packages/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders_packages
     * @name PackagesControllerUpdate
     * @request PATCH:/packages/{id}
     */
    packagesControllerUpdate: (id: string, data: UpdatePackageDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/packages/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders_packages
     * @name PackagesControllerRemove
     * @request DELETE:/packages/{id}
     */
    packagesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/packages/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  transporters = {
    /**
     * No description
     *
     * @tags transporter
     * @name TransportersControllerCreate
     * @request POST:/transporters
     */
    transportersControllerCreate: (data: UserDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transporters`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags transporter
     * @name TransportersControllerFindAll
     * @request GET:/transporters
     */
    transportersControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transporters`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transporter
     * @name TransportersControllerFindOne
     * @request GET:/transporters/{id}
     */
    transportersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transporters/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags transporter
     * @name TransportersControllerUpdate
     * @request PATCH:/transporters/{id}
     */
    transportersControllerUpdate: (id: string, data: UserDTO, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transporters/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags transporter
     * @name TransportersControllerRemove
     * @request DELETE:/transporters/{id}
     */
    transportersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transporters/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  generatePdf = {
    /**
     * No description
     *
     * @tags generate-pdf
     * @name GeneratePdfControllerFindAll
     * @request GET:/generate-pdf
     */
    generatePdfControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/generate-pdf`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags generate-pdf
     * @name GeneratePdfControllerCreate
     * @request POST:/generate-pdf
     */
    generatePdfControllerCreate: (data: CreateGeneratePdfDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/generate-pdf`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags generate-pdf
     * @name GeneratePdfControllerFindOne
     * @request GET:/generate-pdf/{id}
     */
    generatePdfControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/generate-pdf/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags generate-pdf
     * @name GeneratePdfControllerUpdate
     * @request PATCH:/generate-pdf/{id}
     */
    generatePdfControllerUpdate: (id: string, data: UpdateGeneratePdfDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/generate-pdf/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags generate-pdf
     * @name GeneratePdfControllerRemove
     * @request DELETE:/generate-pdf/{id}
     */
    generatePdfControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/generate-pdf/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
}
