import { Controller, Get } from "@nestjs/common";
import { TokenEmail } from "src/middlewares/authentication.middleware";

@Controller()
export class FileController {
    constructor() {}

    @Get("file")
    helloWorld (@TokenEmail() email) : string {
        return email;
    }
}