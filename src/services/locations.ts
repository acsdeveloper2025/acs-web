import { apiService } from './api';
import type {
  Country,
  State,
  City,
  Pincode,
  PincodeArea,
  CreateCountryData,
  UpdateCountryData,
  CreateStateData,
  UpdateStateData,
  CreateCityData,
  UpdateCityData,
  CreatePincodeData,
  UpdatePincodeData
} from '@/types/location';
import type { ApiResponse, PaginationQuery } from '@/types/api';

export interface LocationQuery extends PaginationQuery {
  search?: string;
  state?: string;
  country?: string;
  continent?: string;
}

export class LocationsService {
  // Country operations
  async getCountries(query: LocationQuery = {}): Promise<ApiResponse<Country[]>> {
    return apiService.get('/countries', query);
  }

  async getCountryById(id: string): Promise<ApiResponse<Country>> {
    return apiService.get(`/countries/${id}`);
  }

  async createCountry(data: CreateCountryData): Promise<ApiResponse<Country>> {
    return apiService.post('/countries', data);
  }

  async updateCountry(id: string, data: UpdateCountryData): Promise<ApiResponse<Country>> {
    return apiService.put(`/countries/${id}`, data);
  }

  async deleteCountry(id: string): Promise<ApiResponse<void>> {
    return apiService.delete(`/countries/${id}`);
  }

  async getCountriesStats(): Promise<ApiResponse<any>> {
    return apiService.get('/countries/stats');
  }

  async getCountriesByContinent(continent: string): Promise<ApiResponse<Country[]>> {
    return this.getCountries({ continent });
  }

  // State operations
  async getStates(query: LocationQuery = {}): Promise<ApiResponse<State[]>> {
    return apiService.get('/states', query);
  }

  async getStateById(id: string): Promise<ApiResponse<State>> {
    return apiService.get(`/states/${id}`);
  }

  async createState(data: CreateStateData): Promise<ApiResponse<State>> {
    return apiService.post('/states', data);
  }

  async updateState(id: string, data: UpdateStateData): Promise<ApiResponse<State>> {
    return apiService.put(`/states/${id}`, data);
  }

  async deleteState(id: string): Promise<ApiResponse<void>> {
    return apiService.delete(`/states/${id}`);
  }

  async getStatesByCountry(country: string): Promise<ApiResponse<State[]>> {
    return this.getStates({ country });
  }

  // City operations
  async getCities(query: LocationQuery = {}): Promise<ApiResponse<City[]>> {
    return apiService.get('/cities', query);
  }

  async getCityById(id: string): Promise<ApiResponse<City>> {
    return apiService.get(`/cities/${id}`);
  }

  async createCity(data: CreateCityData): Promise<ApiResponse<City>> {
    return apiService.post('/cities', data);
  }

  async updateCity(id: string, data: UpdateCityData): Promise<ApiResponse<City>> {
    return apiService.put(`/cities/${id}`, data);
  }

  async deleteCity(id: string): Promise<ApiResponse<void>> {
    return apiService.delete(`/cities/${id}`);
  }

  async getCitiesByState(state: string): Promise<ApiResponse<City[]>> {
    return this.getCities({ state });
  }

  // Pincode operations
  async getPincodes(query: LocationQuery = {}): Promise<ApiResponse<Pincode[]>> {
    return apiService.get('/pincodes', query);
  }

  async getPincodeById(id: string): Promise<ApiResponse<Pincode>> {
    return apiService.get(`/pincodes/${id}`);
  }

  async getPincodesByCity(cityId: string): Promise<ApiResponse<Pincode[]>> {
    return apiService.get(`/cities/${cityId}/pincodes`);
  }

  async createPincode(data: CreatePincodeData): Promise<ApiResponse<Pincode>> {
    return apiService.post('/pincodes', data);
  }

  async updatePincode(id: string, data: UpdatePincodeData): Promise<ApiResponse<Pincode>> {
    return apiService.put(`/pincodes/${id}`, data);
  }

  async deletePincode(id: string): Promise<ApiResponse<void>> {
    return apiService.delete(`/pincodes/${id}`);
  }

  async searchPincodes(query: string): Promise<ApiResponse<Pincode[]>> {
    return apiService.get('/pincodes/search', { q: query });
  }

  // Bulk operations
  async bulkImportCities(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });
    
    return response.json();
  }

  async bulkImportPincodes(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pincodes/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });
    
    return response.json();
  }

  // Bulk operations for countries
  async bulkImportCountries(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/countries/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    return response.json();
  }

  // Bulk operations for states
  async bulkImportStates(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/states/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    return response.json();
  }

  // Utility functions
  async getStateNames(): Promise<ApiResponse<State[]>> {
    return apiService.get('/locations/states');
  }

  // Area operations
  async getAreas(query: LocationQuery = {}): Promise<ApiResponse<PincodeArea[]>> {
    return apiService.get('/areas', query);
  }

  async getAreaById(id: string): Promise<ApiResponse<PincodeArea>> {
    return apiService.get(`/areas/${id}`);
  }

  async createArea(data: { name: string }): Promise<ApiResponse<PincodeArea>> {
    return apiService.post('/areas', data);
  }

  async updateArea(id: string, data: { name: string; displayOrder?: number }): Promise<ApiResponse<PincodeArea>> {
    return apiService.put(`/areas/${id}`, data);
  }

  async deleteArea(id: string): Promise<ApiResponse<void>> {
    return apiService.delete(`/areas/${id}`);
  }

  // Add areas to a pincode
  async addPincodeAreas(pincodeId: string, data: { areas: { name: string; displayOrder?: number }[] }): Promise<ApiResponse<any>> {
    return apiService.post(`/pincodes/${pincodeId}/areas`, data);
  }

  // Get areas for dropdown/selection
  async getAreasForSelection(query: { cityId?: string; search?: string } = {}): Promise<ApiResponse<PincodeArea[]>> {
    return apiService.get('/areas', { ...query, limit: 100 });
  }

  // Get standalone areas for multi-select
  async getStandaloneAreas(): Promise<ApiResponse<{ id: string; name: string }[]>> {
    return apiService.get('/standalone-areas');
  }
}

export const locationsService = new LocationsService();
