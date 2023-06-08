import { AxiosRequestConfig } from "axios";
import { CategoryListResponse, CategoryResponse, CategoryPayload} from "../interfaces";
import { config } from "../../shared/repositories/config";
import HttpService from "../../../services/HttpService";
import PayloadProps from "../../shared/interfaces/PayloadProps";

const { baseUrl } = config.apiGateway.server;
const { getAll, getOne, update, remove, create } = config.apiGateway.routes.category;


class CategoryRepository {

  public async getCategorys() {

    const config: AxiosRequestConfig = {
      url: `${baseUrl}/${getAll}`,


    };

    return HttpService.request<CategoryListResponse>({ config });
  }

  public async getOne ( { id }: PayloadProps )
  {
      const config: AxiosRequestConfig = {
          url: `${baseUrl}/${getOne}/${id}`,
      };

      return HttpService.request<CategoryResponse>( { config } );
  }

  public async updateCategory ( { id, data, user }: PayloadProps<CategoryPayload> )
  {
      const config: AxiosRequestConfig = {
          url: `${baseUrl}/${update}/${id}`,
          method: 'PUT',
          data,
      };

      return HttpService.request<CategoryResponse>( { config, user } );
  }

  public createCategory ( { data, user }: PayloadProps<CategoryPayload> )
  {
      const config: AxiosRequestConfig = {
          url: `${baseUrl}/${create}`,
          method: 'POST',
          data,
      };

      return HttpService.request<CategoryResponse>( { config, user } );
  }

  public removeCategory ( { id }: PayloadProps )
  {
      const config: AxiosRequestConfig = {
          url: `${baseUrl}/${remove}/${id}`,
          method: 'DELETE',
      };

      return HttpService.request<CategoryResponse>( { config} );
  }
}

export default CategoryRepository;
