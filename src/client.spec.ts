import {should, use} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {Client} from "./client";
import {DataFormat} from "./data.format";
import {EnvironmentAuthenticationService} from "./environment.authentication.service";
import {HttpUtils} from "./http.utils";
let instance: Client;
describe("Copernicus client", function() {
    this.timeout(3e5);

    before("Initialise chai", () => {
        should();
        use(chaiAsPromised);
    });

    beforeEach("Create client instance", () => {
        const authService = new EnvironmentAuthenticationService();
        const httpUtils = new HttpUtils();
        instance = new Client(authService, httpUtils,
            "https://pchtci8328.execute-api.eu-west-1.amazonaws.com/prod");
    });

    it("Requests some data", async () => {
        const data = await instance.requestGrib({
            name: "reanalysis-era5-single-levels",
            options: {
                variable: "2m_temperature",
                product_type: "reanalysis",
                year: "2017",
                month: "01",
                day: "01",
                time: "12:00",
                format: DataFormat.grib
            }
        });
        console.log(data);
    });

    it("Downloads some data", async () => {

        const data = await instance.requestGrib({
            name: "reanalysis-era5-pressure-levels",
            options: {
                variable: "temperature",
                pressure_level: "1000",
                product_type: "reanalysis",
                date: "2008-01-01",
                time: "12:00",
                format: DataFormat.grib
            }
        });

        const result = await instance.requestJsonLink(data);
        console.log(result);
    });

});
