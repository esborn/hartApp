import ObjectMapper from "../helpers/ObjectMapper";

export default class CommonDataService {
    constructor(countryDataAccessService, regionDataAccessService) {
        this.countryDataAccessService = countryDataAccessService;
        this.regionDataAccessService = regionDataAccessService;
    }

    loadCountries() {
        return this.countryDataAccessService.getAll().then((data) => {
            return ObjectMapper.toAnonymous(data);
        })
    }

    loadRegions() {
        return this.regionDataAccessService.getAll().then((data) => {
            return ObjectMapper.toAnonymous(data);
        })
    }
}

CommonDataService.$inject = ["countryDataAccessService", "regionDataAccessService"];