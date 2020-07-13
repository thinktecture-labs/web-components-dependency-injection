export class HttpClient {
  get<T>(url: string): Promise<T> {
    return fetch(url, this.requestInit()).then((response) => response.json());
  }

  protected requestInit(): RequestInit {
    return {};
  }
}

export class AuthorizedHttpClient extends HttpClient {
  protected requestInit(): RequestInit {
    const init = super.requestInit();

    init.headers = {
      ...init.headers,
      'X-Authorization': 'some-token',
    };

    return init;
  }
}
