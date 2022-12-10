interface Request {
  headers?: any;
  cookies?: any;
  content?: any;
  params?: any;
  query?: any;
  user?: any;
  cf?: {
    timezone: any;
    continent: any;
    country: any;
    region: any;
    regionCode: any;
    city: any;
    postalCode: any;
    longitude: any;
    latitude: any;
    asn: any;
    asOrganization: any;
  };
}
