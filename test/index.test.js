const supertest = require("supertest");

const createRequester = () => {
  // it is necessary to reload ../server module after mocks are defined
  const app = require("../app");
  return supertest(app);
};

describe("test chantier", () => {
  // always we want to use defined modules as initial state
  beforeEach(() => jest.resetModules());

  it("getting mocked module name", async () => {
    jest.doMock("../controllers/chantierCtrl", () => {
      // '../db' mock
      return {
        getOneChantier: () => [
          {
            id_chantier: 1,
            coordonnees_lattitude_chantier: 40.5,
            coordonnees_longitude_chantier: 2.03,
            nom_chantier: "Chantier des oliviers",
            date_de_debut_chantier: "2005-01-02",
            id_projet: 1,
            incident: [
              {
                id_capture: 1,
                url_capture: "https://www.test.fr",
                type_capture: "3D",
                date_capture: "2009-02-05",
                longitude_capture: 43.05,
                lattitude_capture: 2.01,
                reference_gantt: "gantt",
                id_chantier: 1,
                id_incident: 1,
                nom_incident: "incident spontanée",
                description_incident:
                  "Le parafoudre n'a pas fonctionné, il y a eu un départ d'incendie.",
                gravite_incident: 4,
                forceRecord_incident: 0,
              },
            ],
          },
        ],
      };
    });
    // we need to create requester after mock is defined
    const requester = createRequester();
    const users = await requester.get("/api/v1/chantier/1");
    expect(users.body[0]).toBe({
      id_chantier: 1,
      coordonnees_lattitude_chantier: 40.5,
      coordonnees_longitude_chantier: 2.03,
      nom_chantier: "Chantier des oliviers",
      date_de_debut_chantier: "2005-01-02",
      id_projet: 1,
      incident: [
        {
          id_capture: 1,
          url_capture: "https://www.test.fr",
          type_capture: "3D",
          date_capture: "2009-02-05",
          longitude_capture: 43.05,
          lattitude_capture: 2.01,
          reference_gantt: "gantt",
          id_chantier: 1,
          id_incident: 1,
          nom_incident: "incident spontanée",
          description_incident:
            "Le parafoudre n'a pas fonctionné, il y a eu un départ d'incendie.",
          gravite_incident: 4,
          forceRecord_incident: 0,
        },
      ],
    });
  });
});
