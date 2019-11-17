export  enum URLApisEnum{
    Security = 'https://grannyapisecurity.azurewebsites.net/api/v1',
    Product = 'https://grannyapiregister.azurewebsites.net/api/v1/',
    //Search = 'https://grannyapiquery.azurewebsites.net/api/v1/'
    Search = 'http://localhost:3000'
}

export enum SecurityServicesEnum{
    Users = 'Users',
    Login = 'Authentication'
}

export enum ProductServicesEnum{
    Save = 'Price'
}

export enum SearchServicesEnum{
    ByName = 'Product',
    ByCode = 'BestPrice/GetByCode',
    ByLocation = 'BestPrice/GetByLocation'
}

export enum StorageKeyEnum{
    Token = 'token',
    AuthToken = 'authToken'
}

export enum Environment {
    env = "dev"
}