import Jasmine from "jasmine";

const jasmine = new Jasmine();
jasmine.loadConfigFile("tests/integration/jasmine.json");
jasmine.execute();
