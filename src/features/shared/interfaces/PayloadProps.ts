import { LoginApi } from '../../auth/interfaces/login';

interface PayloadProps<T=Record<string, any>>
{
    user?: LoginApi;
    title?: string,
    queryParams?: any;
    id?: string;
    data?: T;
}

export default PayloadProps;
