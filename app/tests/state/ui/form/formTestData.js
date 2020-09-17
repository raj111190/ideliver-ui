export const labResultFormMetaData = {
  uuid: '200115DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  name: 'Lab Results',
  description: 'Gathers lab results',
  retired: false,
  encounterType: {
    uuid: '200116DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    display: 'Lab Results',
  },
  formFields: [
    {
      uuid: '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Labs',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d492026-c2cc-11de-8d13-0010c6dffd0f',
            display: 'LabSet',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              set: false,
              display: 'Lab Date',
              datatype: {
                uuid: '8d4a5af4-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Datetime',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              uuid: '200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
            {
              set: false,
              display: 'Lab Test',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [
                {
                  set: false,
                  display: "Mother's HIV status",
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  answers: [
                    {
                      uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Positive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Negative',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Inconclusive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180043DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Not tested',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                  attributes: [],
                  setMembers: [],
                  uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  description: null,
                },
                {
                  set: false,
                  display: 'Blood Group',
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Test',
                  },
                  answers: [
                    {
                      uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'A+',
                      description: {
                        uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group A+',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'A-',
                      description: {
                        uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group A-',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'B+',
                      description: {
                        uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group B+',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'B-',
                      description: {
                        uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group B-',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'O+',
                      description: {
                        uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group O+',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'O-',
                      description: {
                        uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group O-',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'AB+',
                      description: {
                        uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group AB+',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'AB-',
                      description: {
                        uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        display: 'Blood group AB-',
                      },
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Finding',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                  attributes: [],
                  setMembers: [],
                  uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  description: null,
                },
                {
                  uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Hgb (g/dL)',
                  description: null,
                  datatype: {
                    uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Numeric',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                  answers: [],
                },
                {
                  set: false,
                  display: 'Urinalysis status',
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Test',
                  },
                  answers: [
                    {
                      uuid: '180066DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Trace',
                      description: null,
                      datatype: {
                        uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Coded',
                      },
                      conceptClass: {
                        uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Question',
                      },
                      attributes: [],
                      set: false,
                      answers: [
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                          display: 'Pus cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                          display: 'Epithelial cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                          display: 'Bacteria',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                          display: 'TV',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                          display: 'Blood',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                      ],
                    },
                    {
                      uuid: '180067DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: '1+',
                      description: null,
                      datatype: {
                        uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Coded',
                      },
                      conceptClass: {
                        uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Question',
                      },
                      attributes: [],
                      set: false,
                      answers: [
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                          display: 'Pus cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                          display: 'Epithelial cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                          display: 'Bacteria',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                          display: 'TV',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                          display: 'Blood',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                      ],
                    },
                    {
                      uuid: '180068DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: '2+',
                      description: null,
                      datatype: {
                        uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Coded',
                      },
                      conceptClass: {
                        uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Question',
                      },
                      attributes: [],
                      set: false,
                      answers: [
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                          display: 'Pus cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                          display: 'Epithelial cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                          display: 'Bacteria',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                          display: 'TV',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                          display: 'Blood',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                      ],
                    },
                    {
                      uuid: '180069DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: '3+',
                      description: null,
                      datatype: {
                        uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Coded',
                      },
                      conceptClass: {
                        uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Question',
                      },
                      attributes: [],
                      set: false,
                      answers: [
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                          display: 'Pus cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                          display: 'Epithelial cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                          display: 'Bacteria',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                          display: 'TV',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                          display: 'Blood',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                      ],
                    },
                    {
                      uuid: '6a46af46-dd46-4d44-8346-53feff728bf4',
                      display: '4+',
                      description: null,
                      datatype: {
                        uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Coded',
                      },
                      conceptClass: {
                        uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Question',
                      },
                      attributes: [],
                      set: false,
                      answers: [
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                          display: 'Pus cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                          display: 'Epithelial cells',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                          display: 'Bacteria',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                          display: 'TV',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                        {
                          uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                          display: 'Blood',
                          description: null,
                          datatype: {
                            uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'N/A',
                          },
                          conceptClass: {
                            uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                            display: 'Misc',
                          },
                          attributes: [],
                          set: false,
                        },
                      ],
                    },
                    {
                      uuid: '15657ad3-8b5d-4ff7-8967-fd39918923c4',
                      display: 'NAD (Nothing Abnormal Detected)',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                  attributes: [],
                  setMembers: [],
                  uuid: '200110DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  description: null,
                },
                {
                  uuid: '200111DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Syphilis status',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Test',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Positive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Negative',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '200112DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Malaria status',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Test',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Positive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Negative',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Inconclusive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '2a9ec4fa-ac8a-4c86-a178-ea80d8b7fef2',
                  display: 'Hep B',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Positive',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Negative',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '783f8f17-4c75-40ec-b270-ecdf42b82c71',
                  display: 'Platelet count',
                  description: null,
                  datatype: {
                    uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Numeric',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [],
                },
                {
                  uuid: '2cf9783a-905a-42a4-8c0c-54a9d9ca5d34',
                  display: 'WBC count',
                  description: null,
                  datatype: {
                    uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Numeric',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [],
                },
              ],
              attributes: [],
              setMembers: [],
              uuid: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
            {
              set: false,
              display: "Mother's HIV status",
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              answers: [
                {
                  uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Positive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Negative',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Inconclusive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180043DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Not tested',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
              attributes: [],
              setMembers: [],
              uuid: '200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
            {
              set: false,
              display: 'Blood Group',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Test',
              },
              answers: [
                {
                  uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'A+',
                  description: {
                    uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group A+',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'A-',
                  description: {
                    uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group A-',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'B+',
                  description: {
                    uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group B+',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'B-',
                  description: {
                    uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group B-',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'O+',
                  description: {
                    uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group O+',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'O-',
                  description: {
                    uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group O-',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'AB+',
                  description: {
                    uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group AB+',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'AB-',
                  description: {
                    uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    display: 'Blood group AB-',
                  },
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                  },
                  attributes: [],
                  set: false,
                },
              ],
              attributes: [],
              setMembers: [],
              uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
            {
              uuid: '200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Hgb (g/dL)',
              description: null,
              datatype: {
                uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Numeric',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
              },
              attributes: [],
              set: false,
              answers: [],
            },
            {
              set: false,
              display: 'Urinalysis status',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Test',
              },
              answers: [
                {
                  uuid: '180066DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Trace',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                      display: 'Pus cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                      display: 'Epithelial cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                      display: 'Bacteria',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                      display: 'TV',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                      display: 'Blood',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '180067DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: '1+',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                      display: 'Pus cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                      display: 'Epithelial cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                      display: 'Bacteria',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                      display: 'TV',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                      display: 'Blood',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '180068DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: '2+',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                      display: 'Pus cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                      display: 'Epithelial cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                      display: 'Bacteria',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                      display: 'TV',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                      display: 'Blood',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '180069DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: '3+',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                      display: 'Pus cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                      display: 'Epithelial cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                      display: 'Bacteria',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                      display: 'TV',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                      display: 'Blood',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '6a46af46-dd46-4d44-8346-53feff728bf4',
                  display: '4+',
                  description: null,
                  datatype: {
                    uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Coded',
                  },
                  conceptClass: {
                    uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Question',
                  },
                  attributes: [],
                  set: false,
                  answers: [
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                      display: 'Pus cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                      display: 'Epithelial cells',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                      display: 'Bacteria',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                      display: 'TV',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                    {
                      uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                      display: 'Blood',
                      description: null,
                      datatype: {
                        uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'N/A',
                      },
                      conceptClass: {
                        uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                        display: 'Misc',
                      },
                      attributes: [],
                      set: false,
                    },
                  ],
                },
                {
                  uuid: '15657ad3-8b5d-4ff7-8967-fd39918923c4',
                  display: 'NAD (Nothing Abnormal Detected)',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
              attributes: [],
              setMembers: [],
              uuid: '200110DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
            {
              uuid: '200111DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Syphilis status',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Test',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Positive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Negative',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '200112DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Malaria status',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Test',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Positive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Negative',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180042DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Inconclusive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '2a9ec4fa-ac8a-4c86-a178-ea80d8b7fef2',
              display: 'Hep B',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: '180040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Positive',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: '180041DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  display: 'Negative',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '783f8f17-4c75-40ec-b270-ecdf42b82c71',
              display: 'Platelet count',
              description: null,
              datatype: {
                uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Numeric',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [],
            },
            {
              uuid: '2cf9783a-905a-42a4-8c0c-54a9d9ca5d34',
              display: 'WBC count',
              description: null,
              datatype: {
                uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Numeric',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [],
            },
            {
              uuid: '180066DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Trace',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                  display: 'Pus cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                  display: 'Epithelial cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                  display: 'Bacteria',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                  display: 'TV',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                  display: 'Blood',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '180067DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: '1+',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                  display: 'Pus cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                  display: 'Epithelial cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                  display: 'Bacteria',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                  display: 'TV',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                  display: 'Blood',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '180068DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: '2+',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                  display: 'Pus cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                  display: 'Epithelial cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                  display: 'Bacteria',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                  display: 'TV',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                  display: 'Blood',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '180069DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: '3+',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                  display: 'Pus cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                  display: 'Epithelial cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                  display: 'Bacteria',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                  display: 'TV',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                  display: 'Blood',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
            {
              uuid: '6a46af46-dd46-4d44-8346-53feff728bf4',
              display: '4+',
              description: null,
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              attributes: [],
              set: false,
              answers: [
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8080',
                  display: 'Pus cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8081',
                  display: 'Epithelial cells',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8082',
                  display: 'Bacteria',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8083',
                  display: 'TV',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
                {
                  uuid: 'b60de348-b506-4991-ab93-64da311d8084',
                  display: 'Blood',
                  description: null,
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                  },
                  conceptClass: {
                    uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Misc',
                  },
                  attributes: [],
                  set: false,
                },
              ],
            },
          ],
          uuid: '200113DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Labs',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: '200114DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        description:
          '{"name":"VcFieldsSet","props":{"fields":{"200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDateTime","props":{"hasTime":false},"validation":{}},"200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDownSet","props":{"fields":{"200082DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200109DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcTextField","props":{"vType":"number"}},"200110DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDownSet","props":{"fields":{"180066DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{"labelId":"urinalysisDetected"}},"180067DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{"labelId":"urinalysisDetected"}},"180068DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{"labelId":"urinalysisDetected"}},"180069DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{"labelId":"urinalysisDetected"}},"6a46af46-dd46-4d44-8346-53feff728bf4":{"name":"VcDropDown","props":{"labelId":"urinalysisDetected"}}}}},"200111DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"200112DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD":{"name":"VcDropDown","props":{}},"2a9ec4fa-ac8a-4c86-a178-ea80d8b7fef2":{"name":"VcDropDown","props":{}},"783f8f17-4c75-40ec-b270-ecdf42b82c71":{"name":"VcTextField","props":{"vType":"number","min":0,"max":700,"warnMin":130,"warnMax":400,"warnMsgId":"plateletError"}},"2cf9783a-905a-42a4-8c0c-54a9d9ca5d34":{"name":"VcTextField","props":{"vType":"number","min":"0","max":"700","warnMin":"3.5","warnMax":"10","warnMsgId":"wbcError"}}}},"validation":{}}}},"validation":{}}',
      },
      fieldNumber: 1,
      pageNumber: 1,
    },
  ],
  requiredFormFields: {},
  fieldToFormFields: {
    '200114DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD':
      '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
  },
};
export const labResultFormData = {
  '200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD': {
    value: [
      {
        concept: '200113DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
        uuid: 'bc46eca4-a497-41e7-9d3c-2e742c8245b9',
        comment: '{"formField":"200117DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"}',
        obsDatetime: '2019-09-06T15:58:11.000-0400',
        groupMembers: [
          {
            concept: '200105DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            value: '2019-09-06T15:57:00.000-0400',
            memUuid: '5b0a695a-9a26-427c-a4f2-a61a15db09cb',
            uuid: '5b0a695a-9a26-427c-a4f2-a61a15db09cb',
          },
          {
            concept: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            value: {
              set: false,
              display: 'B+',
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
                name: 'N/A',
                description:
                  'Not associated with a datatype (e.g., term answers, sets)',
                hl7Abbreviation: 'ZZ',
                retired: false,
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full',
                  },
                ],
                resourceVersion: '1.8',
              },
              mappings: [],
              names: [
                {
                  display: 'B+',
                  uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  name: 'B+',
                  locale: 'en',
                  localePreferred: true,
                  conceptNameType: 'FULLY_SPECIFIED',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  resourceVersion: '1.9',
                },
              ],
              auditInfo: {
                creator: {
                  uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                  display: 'daemon',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                    },
                  ],
                },
                dateCreated: '2019-07-24T13:58:04.000-0400',
                changedBy: {
                  uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                  display: 'daemon',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                    },
                  ],
                },
                dateChanged: '2019-07-24T13:58:04.000-0400',
              },
              retired: false,
              resourceVersion: '2.0',
              name: {
                display: 'B+',
                uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                name: 'B+',
                locale: 'en',
                localePreferred: true,
                conceptNameType: 'FULLY_SPECIFIED',
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                  },
                ],
                resourceVersion: '1.9',
              },
              conceptClass: {
                uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Finding',
                name: 'Finding',
                description: 'Practitioner observation/finding',
                retired: false,
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f?v=full',
                  },
                ],
                resourceVersion: '1.8',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              descriptions: [
                {
                  display: 'Blood group B+',
                  uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  description: 'Blood group B+',
                  locale: 'en',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  resourceVersion: '1.9',
                },
              ],
              version: null,
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
              ],
              uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            memUuid: 'f0ad0ef8-edf2-4d33-8002-cc8f6f3e2894',
            uuid: 'f0ad0ef8-edf2-4d33-8002-cc8f6f3e2894',
          },
          {
            concept: '200106DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            value: {
              set: false,
              display: 'Blood Group',
              datatype: {
                uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Coded',
                name: 'Coded',
                description:
                  'Value determined by term dictionary lookup (i.e., term identifier)',
                hl7Abbreviation: 'CWE',
                retired: false,
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a48b6-c2cc-11de-8d13-0010c6dffd0f?v=full',
                  },
                ],
                resourceVersion: '1.8',
              },
              mappings: [],
              names: [
                {
                  display: 'Blood Group',
                  uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  name: 'Blood Group',
                  locale: 'en',
                  localePreferred: true,
                  conceptNameType: 'FULLY_SPECIFIED',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  resourceVersion: '1.9',
                },
              ],
              auditInfo: {
                creator: {
                  uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                  display: 'daemon',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                    },
                  ],
                },
                dateCreated: '2019-07-24T13:58:18.000-0400',
                changedBy: {
                  uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                  display: 'daemon',
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
                    },
                  ],
                },
                dateChanged: '2019-09-06T11:44:59.000-0400',
              },
              retired: false,
              resourceVersion: '2.0',
              name: {
                display: 'Blood Group',
                uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                name: 'Blood Group',
                locale: 'en',
                localePreferred: true,
                conceptNameType: 'FULLY_SPECIFIED',
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                  },
                ],
                resourceVersion: '1.9',
              },
              conceptClass: {
                uuid: '8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Test',
                name: 'Test',
                description:
                  'Acq. during patient encounter (vitals, labs, etc.)',
                retired: false,
                links: [
                  {
                    rel: 'self',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4907b2-c2cc-11de-8d13-0010c6dffd0f',
                  },
                  {
                    rel: 'full',
                    uri:
                      'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4907b2-c2cc-11de-8d13-0010c6dffd0f?v=full',
                  },
                ],
                resourceVersion: '1.8',
              },
              answers: [
                {
                  set: false,
                  display: 'A+',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'A+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'A+',
                    uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'A+',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group A+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180058DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'A-',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'A-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'A-',
                    uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'A-',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group A-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180059DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'B+',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'B+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'B+',
                    uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'B+',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group B+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180060DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'B-',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'B-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'B-',
                    uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'B-',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group B-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180061DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'O+',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'O+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'O+',
                    uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'O+',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group O+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180062DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'O-',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'O-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'O-',
                    uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'O-',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group O-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180063DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'AB+',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'AB+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'AB+',
                    uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'AB+',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group AB+',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180064DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
                {
                  set: false,
                  display: 'AB-',
                  datatype: {
                    uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'N/A',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  mappings: [],
                  names: [
                    {
                      uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'AB-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  retired: false,
                  resourceVersion: '2.0',
                  name: {
                    display: 'AB-',
                    uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    name: 'AB-',
                    locale: 'en',
                    localePreferred: true,
                    conceptNameType: 'FULLY_SPECIFIED',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      },
                      {
                        rel: 'full',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                      },
                    ],
                    resourceVersion: '1.9',
                  },
                  conceptClass: {
                    uuid: '8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                    display: 'Finding',
                    links: [
                      {
                        rel: 'self',
                        uri:
                          'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d491a9a-c2cc-11de-8d13-0010c6dffd0f',
                      },
                    ],
                  },
                  answers: [],
                  attributes: [],
                  setMembers: [],
                  descriptions: [
                    {
                      uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                      display: 'Blood group AB-',
                      links: [
                        {
                          rel: 'self',
                          uri:
                            'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/description/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                        },
                      ],
                    },
                  ],
                  version: null,
                  links: [
                    {
                      rel: 'self',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                    },
                    {
                      rel: 'full',
                      uri:
                        'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
                    },
                  ],
                  uuid: '180065DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
              ],
              attributes: [],
              setMembers: [],
              descriptions: [],
              version: null,
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
                },
              ],
              uuid: '200107DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            memUuid: 'ad01cba7-4855-49c3-8d2c-fce68d464038',
            uuid: 'ad01cba7-4855-49c3-8d2c-fce68d464038',
          },
        ],
      },
    ],
  },
  lastUpdated: '2019-09-06T15:58:12.000-0400',
  encounterUuid: 'f6ccb04f-2dc9-48de-99e8-6b430f74ab05',
  encounterDatetime: '2019-09-06T15:58:11.000-0400',
};
export const medicalHistoryFormMetaData = {
  uuid: 'cabbcdd0-cb6d-4352-b2f1-20a7616ea8ca',
  name: 'Medical History',
  description: 'Gathers information about the medical history of the client.',
  retired: false,
  encounterType: {
    uuid: 'b6d48a7e-7d27-4167-989b-b757e07b102c',
    display: 'Medical History',
  },
  formFields: [
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000004',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Blood transfusion',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200035DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Blood transfusion',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000002',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 4,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000005',
      description: null,
      parent: { uuid: 'ee038cc4-1a53-4738-8967-aaa000000004' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Year of transfusion',
          datatype: {
            uuid: '8d4a4488-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Numeric',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200036DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Year of transfusion',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000007',
        description:
          '{"name":"VcTextField","props":{"vType":"text","min":0,"pattern":"^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$"},"validation":{}}',
      },
      fieldNumber: 5,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000002',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Drug allergy',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200033DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Drug allergy',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000001',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 2,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000003',
      description: null,
      parent: { uuid: 'ee038cc4-1a53-4738-8967-aaa000000002' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Specify drug allergy',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200034DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Specify drug allergy',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000006',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
      },
      fieldNumber: 3,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000008',
      description: null,
      parent: { uuid: 'ee038cc4-1a53-4738-8967-aaa000000007' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Enter past surgery details',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200039DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Enter past surgery details',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000008',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
      },
      fieldNumber: 8,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000006',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Family/Social history',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200037DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Family/Social history',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000003',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
      },
      fieldNumber: 6,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000007',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Past surgeries',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200038DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Past surgeries',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000004',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 7,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000000',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Medical history remarks',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200040DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Medical history remarks',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000005',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
      },
      fieldNumber: 9,
      pageNumber: 1,
    },
    {
      uuid: 'ee038cc4-1a53-4738-8967-aaa000000001',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Existing Conditions',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: 'e15d75da-272f-46d5-9314-be19bf92de9d',
            display: 'MultiSelectSet',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              uuid: '117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Hypertension',
              description: {
                uuid: '5011FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                display:
                  'Persistently high arterial blood pressure. Currently accepted threshold levels are 140 mm Hg systolic and 90 mm Hg diastolic pressure.',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '7899acfd-6cb0-4724-9e94-07ecdf03a6c1',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190028DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Cardio-pulmonary disease',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '99726b5a-e1cb-48ad-9854-d1dce8d26ddc',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Hepato-bilary disease',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '9ad87691-a2c6-413d-9c33-3fb1fd1a9890',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190030DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'HIV',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '5030d81b-f2fa-464b-98af-f812b69ec9f6',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190031DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Tuberculosis',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '9948fb6d-b9ce-4daf-9e5e-124ad11298ef',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Diabetes',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '4d928bba-f0b8-4d56-9d9f-cff1fdef1e34',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190033DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Gastro-intestinal disease',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: 'd61e3522-3730-428d-9cb7-e2cc6e960f01',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190034DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Musculo-skeletal disease',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '7476fbca-da73-4267-a0b1-d653fbc51b85',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Malaria',
              description: {
                uuid: '4639FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                display:
                  'A protozoan disease caused by four species of the genus PLASMODIUM (P. falciparum (MALARIA, FALCIPARUM), P. vivax (MALARIA, VIVAX), P. ovale, and P. malariae) and transmitted by the bite of an infected female mosquito of the genus Anopheles. Malaria is endemic in parts of Asia, Africa, Central and South America, Oceania, and certain Caribbean islands. It is characterized by extreme exhaustion associated with paroxysms of high fever, sweating, shaking chills, and anemia.',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: 'b7268525-c4b1-4d1b-be78-2f44e52849e4',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190006DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Stunting',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '569a637a-0757-4f24-a289-9460aecd2b70',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190007DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Wasting',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '583954d6-2e18-42ac-a4d0-a524eb7cd7a5',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
            {
              uuid: '190008DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'Underweight',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Diagnosis',
              },
              attributes: [
                {
                  uuid: '2d1b1225-c570-4db0-a112-5c54e5af3d11',
                  display: 'Diagnosis Acuity: ',
                  value: '',
                  attributeType: {
                    uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
                    display: 'Diagnosis Acuity',
                  },
                  voided: false,
                },
              ],
              set: false,
              answers: [],
            },
          ],
          uuid: '200032DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Existing conditions',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-aa0000000000',
        description:
          '{"name":"VcCheckBoxGroup","props":{"options":[{ "value": "TB" },{ "value": "Diabetes" },{ "value": "Hypertension" },{ "value": "Malaria" },{ "value": "HIV" }]},"validation":{}}',
      },
      fieldNumber: 1,
      pageNumber: 1,
    },
  ],
  requiredFormFields: {},
  fieldToFormFields: {
    'fbdd4887-8f3b-414b-919d-aa0000000000':
      'ee038cc4-1a53-4738-8967-aaa000000001',
    'fbdd4887-8f3b-414b-919d-aa0000000001':
      'ee038cc4-1a53-4738-8967-aaa000000002',
    'fbdd4887-8f3b-414b-919d-aa0000000002':
      'ee038cc4-1a53-4738-8967-aaa000000004',
    'fbdd4887-8f3b-414b-919d-aa0000000003':
      'ee038cc4-1a53-4738-8967-aaa000000006',
    'fbdd4887-8f3b-414b-919d-aa0000000004':
      'ee038cc4-1a53-4738-8967-aaa000000007',
    'fbdd4887-8f3b-414b-919d-aa0000000005':
      'ee038cc4-1a53-4738-8967-aaa000000000',
    'fbdd4887-8f3b-414b-919d-aa0000000006':
      'ee038cc4-1a53-4738-8967-aaa000000003',
    'fbdd4887-8f3b-414b-919d-aa0000000007':
      'ee038cc4-1a53-4738-8967-aaa000000005',
    'fbdd4887-8f3b-414b-919d-aa0000000008':
      'ee038cc4-1a53-4738-8967-aaa000000008',
  },
};
export const medicalHistoryData = {
  lastUpdated: '2019-09-06T16:25:01.000-0400',
  'ee038cc4-1a53-4738-8967-aaa000000001': {
    value: [
      {
        set: false,
        display: 'Hypertension',
        datatype: {
          uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
          display: 'N/A',
          name: 'N/A',
          description:
            'Not associated with a datatype (e.g., term answers, sets)',
          hl7Abbreviation: 'ZZ',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        mappings: [
          {
            display: 'SNOMED CT: 38341003',
            uuid: '136765ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '9664889b-313c-3907-a2cc-fa1a7e80c4f5',
              display: 'SNOMED CT: 38341003',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/9664889b-313c-3907-a2cc-fa1a7e80c4f5',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/136765ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/136765ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'IMO ProblemIT: 86491',
            uuid: '276535ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '387b7a8e-429d-3345-8c4c-e94947d0db24',
              display: 'IMO ProblemIT: 86491',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/387b7a8e-429d-3345-8c4c-e94947d0db24',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/276535ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/276535ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'CIEL: 117399',
            uuid: '276098ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '6e1495bc-eb09-3528-875f-1b7d432a81d5',
              display: 'CIEL: 117399',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/6e1495bc-eb09-3528-875f-1b7d432a81d5',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/276098ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/276098ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'ICD-10-WHO: I10',
            uuid: '275756ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '696974e4-37ad-399d-9a69-c713c279dcef',
              display: 'ICD-10-WHO: I10',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/696974e4-37ad-399d-9a69-c713c279dcef',
                },
              ],
            },
            conceptMapType: {
              uuid: '43ac5109-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'NARROWER-THAN',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/43ac5109-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/275756ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/275756ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'AMPATH: 903',
            uuid: '275698ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '021449fb-cdac-33a2-942a-9688087dd470',
              display: 'AMPATH: 903',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/021449fb-cdac-33a2-942a-9688087dd470',
                },
              ],
            },
            conceptMapType: {
              uuid: '43ac5109-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'NARROWER-THAN',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/43ac5109-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/275698ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/275698ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        names: [
          {
            display: 'Tăng huyết áp',
            uuid: '131504BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Tăng huyết áp',
            locale: 'vi',
            localePreferred: false,
            conceptNameType: null,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/131504BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/131504BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'HTA',
            uuid: '134401BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'HTA',
            locale: 'fr',
            localePreferred: false,
            conceptNameType: 'SHORT',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134401BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134401BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Huyết áp cao',
            uuid: '130648BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Huyết áp cao',
            locale: 'vi',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/130648BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/130648BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'High blood pressure',
            uuid: '107313BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'High blood pressure',
            locale: 'en',
            localePreferred: false,
            conceptNameType: null,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/107313BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/107313BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Ipètansyon',
            uuid: '134402BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Ipètansyon',
            locale: 'ht',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134402BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134402BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Hypertension',
            uuid: '17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Hypertension',
            locale: 'en',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'HTN (hypertension)',
            uuid: '108071BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'HTN (hypertension)',
            locale: 'en',
            localePreferred: false,
            conceptNameType: null,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/108071BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/108071BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Hypertension artérielle',
            uuid: '134400BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Hypertension artérielle',
            locale: 'fr',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134400BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134400BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        auditInfo: {
          creator: {
            uuid: '1c3db49d-440a-11e6-a65c-00e04c680037',
            display: 'admin',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/1c3db49d-440a-11e6-a65c-00e04c680037',
              },
            ],
          },
          dateCreated: '2007-11-03T00:00:00.000-0400',
          changedBy: {
            uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
            display: 'daemon',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
              },
            ],
          },
          dateChanged: '2019-09-06T11:44:51.000-0400',
        },
        retired: false,
        resourceVersion: '2.0',
        name: {
          display: 'Hypertension',
          uuid: '17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
          name: 'Hypertension',
          locale: 'en',
          localePreferred: true,
          conceptNameType: 'FULLY_SPECIFIED',
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/17788BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
            },
          ],
          resourceVersion: '1.9',
        },
        memUuid: '9d694b4e-bc47-437e-963f-98f5dd14bad2',
        conceptClass: {
          uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Diagnosis',
          name: 'Diagnosis',
          description: 'Conclusion drawn through findings',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        answers: [],
        attributes: [
          {
            display: 'Diagnosis Acuity: ',
            uuid: '7899acfd-6cb0-4724-9e94-07ecdf03a6c1',
            attributeType: {
              uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
              display: 'Diagnosis Acuity',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptattributetype/1462868d-2b58-48b6-bc25-1ad846aa71a9',
                },
              ],
            },
            value: '',
            voided: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/attribute/7899acfd-6cb0-4724-9e94-07ecdf03a6c1',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/attribute/7899acfd-6cb0-4724-9e94-07ecdf03a6c1?v=full',
              },
            ],
            resourceVersion: '2.0',
          },
        ],
        setMembers: [],
        descriptions: [
          {
            display:
              'Persistently high arterial blood pressure. Currently accepted threshold levels are 140 mm Hg systolic and 90 mm Hg diastolic pressure.',
            uuid: '5011FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            description:
              'Persistently high arterial blood pressure. Currently accepted threshold levels are 140 mm Hg systolic and 90 mm Hg diastolic pressure.',
            locale: 'en',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/description/5011FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/description/5011FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        version: null,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          },
        ],
        uuid: '117399AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
      {
        set: false,
        display: 'Hepato-bilary disease',
        datatype: {
          uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
          display: 'N/A',
          name: 'N/A',
          description:
            'Not associated with a datatype (e.g., term answers, sets)',
          hl7Abbreviation: 'ZZ',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        mappings: [],
        names: [
          {
            display: 'Hepato-bilary disease',
            uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            name: 'Hepato-bilary disease',
            locale: 'en',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        auditInfo: {
          creator: {
            uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
            display: 'daemon',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
              },
            ],
          },
          dateCreated: '2019-07-24T13:58:08.000-0400',
          changedBy: {
            uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
            display: 'daemon',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
              },
            ],
          },
          dateChanged: '2019-09-06T11:44:50.000-0400',
        },
        retired: false,
        resourceVersion: '2.0',
        name: {
          display: 'Hepato-bilary disease',
          uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          name: 'Hepato-bilary disease',
          locale: 'en',
          localePreferred: true,
          conceptNameType: 'FULLY_SPECIFIED',
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/name/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD?v=full',
            },
          ],
          resourceVersion: '1.9',
        },
        memUuid: '529310c0-c010-4432-80b5-6aba9e18c340',
        conceptClass: {
          uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Diagnosis',
          name: 'Diagnosis',
          description: 'Conclusion drawn through findings',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        answers: [],
        attributes: [
          {
            display: 'Diagnosis Acuity: ',
            uuid: '9ad87691-a2c6-413d-9c33-3fb1fd1a9890',
            attributeType: {
              uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
              display: 'Diagnosis Acuity',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptattributetype/1462868d-2b58-48b6-bc25-1ad846aa71a9',
                },
              ],
            },
            value: '',
            voided: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/attribute/9ad87691-a2c6-413d-9c33-3fb1fd1a9890',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD/attribute/9ad87691-a2c6-413d-9c33-3fb1fd1a9890?v=full',
              },
            ],
            resourceVersion: '2.0',
          },
        ],
        setMembers: [],
        descriptions: [],
        version: null,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          },
        ],
        uuid: '190029DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      },
      {
        set: false,
        display: 'Malaria',
        datatype: {
          uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
          display: 'N/A',
          name: 'N/A',
          description:
            'Not associated with a datatype (e.g., term answers, sets)',
          hl7Abbreviation: 'ZZ',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        mappings: [
          {
            display: 'ICD-10-WHO: B54',
            uuid: '88127ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '83f931b9-94d2-3da0-a7f9-8c41b96842a7',
              display: 'ICD-10-WHO: B54',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/83f931b9-94d2-3da0-a7f9-8c41b96842a7',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/88127ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/88127ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'PIH: 123',
            uuid: '143612ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '0e1c91ba-efbd-3d8f-b613-61965ec49fb4',
              display: 'PIH: 123',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/0e1c91ba-efbd-3d8f-b613-61965ec49fb4',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/143612ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/143612ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'AMPATH: 906',
            uuid: '134582ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '6be56a20-6e83-3c0c-9159-266d61360f4d',
              display: 'AMPATH: 906',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/6be56a20-6e83-3c0c-9159-266d61360f4d',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/134582ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/134582ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'IMO ProblemIT: 28660',
            uuid: '267991ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '509956c1-07d4-31d4-ba87-3d3bd4c6620b',
              display: 'IMO ProblemIT: 28660',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/509956c1-07d4-31d4-ba87-3d3bd4c6620b',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/267991ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/267991ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'SNOMED CT: 61462000',
            uuid: '73619ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '44430f13-2466-36be-91ae-512d61f6445d',
              display: 'SNOMED CT: 61462000',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/44430f13-2466-36be-91ae-512d61f6445d',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/73619ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/73619ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'CIEL: 116128',
            uuid: '182724ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: 'd8276b5b-e2a4-3623-96b1-d093627d94a0',
              display: 'CIEL: 116128',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/d8276b5b-e2a4-3623-96b1-d093627d94a0',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/182724ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/182724ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'AMPATH: 123',
            uuid: '133986ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: 'cc1d56ec-36ae-3270-891c-6f430f6ca6c8',
              display: 'AMPATH: 123',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/cc1d56ec-36ae-3270-891c-6f430f6ca6c8',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/133986ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/133986ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'PIH Malawi: 123',
            uuid: '144370ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            conceptReferenceTerm: {
              uuid: '02128905-ab8a-3117-8b25-f5a105e14f8b',
              display: 'PIH Malawi: 123',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/02128905-ab8a-3117-8b25-f5a105e14f8b',
                },
              ],
            },
            conceptMapType: {
              uuid: '35543629-7d8c-11e1-909d-c80aa9edcf4e',
              display: 'SAME-AS',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e',
                },
              ],
            },
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/144370ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/144370ABBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        names: [
          {
            display: 'Bệnh sốt rét',
            uuid: '130754BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Bệnh sốt rét',
            locale: 'vi',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/130754BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/130754BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'paludismo',
            uuid: '83994BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'paludismo',
            locale: 'es',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/83994BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/83994BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Malaria',
            uuid: '16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Malaria',
            locale: 'en',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'malarya',
            uuid: '134406BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'malarya',
            locale: 'ht',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134406BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134406BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'PALUDISME',
            uuid: '16604BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'PALUDISME',
            locale: 'fr',
            localePreferred: true,
            conceptNameType: 'FULLY_SPECIFIED',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16604BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16604BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
          {
            display: 'Malaria',
            uuid: '134405BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            name: 'Malaria',
            locale: 'fr',
            localePreferred: false,
            conceptNameType: null,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134405BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/134405BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        auditInfo: {
          creator: {
            uuid: '1c3db49d-440a-11e6-a65c-00e04c680037',
            display: 'admin',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/1c3db49d-440a-11e6-a65c-00e04c680037',
              },
            ],
          },
          dateCreated: '2007-11-03T00:00:00.000-0400',
          changedBy: {
            uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
            display: 'daemon',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB',
              },
            ],
          },
          dateChanged: '2019-09-06T11:44:51.000-0400',
        },
        retired: false,
        resourceVersion: '2.0',
        name: {
          display: 'Malaria',
          uuid: '16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
          name: 'Malaria',
          locale: 'en',
          localePreferred: true,
          conceptNameType: 'FULLY_SPECIFIED',
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/16603BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB?v=full',
            },
          ],
          resourceVersion: '1.9',
        },
        memUuid: '09b7e044-c656-43cc-bfd5-0499f3731e9f',
        conceptClass: {
          uuid: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Diagnosis',
          name: 'Diagnosis',
          description: 'Conclusion drawn through findings',
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
            },
            {
              rel: 'full',
              uri:
                'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4918b0-c2cc-11de-8d13-0010c6dffd0f?v=full',
            },
          ],
          resourceVersion: '1.8',
        },
        answers: [],
        attributes: [
          {
            display: 'Diagnosis Acuity: ',
            uuid: 'b7268525-c4b1-4d1b-be78-2f44e52849e4',
            attributeType: {
              uuid: '1462868d-2b58-48b6-bc25-1ad846aa71a9',
              display: 'Diagnosis Acuity',
              links: [
                {
                  rel: 'self',
                  uri:
                    'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/conceptattributetype/1462868d-2b58-48b6-bc25-1ad846aa71a9',
                },
              ],
            },
            value: '',
            voided: false,
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/attribute/b7268525-c4b1-4d1b-be78-2f44e52849e4',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/attribute/b7268525-c4b1-4d1b-be78-2f44e52849e4?v=full',
              },
            ],
            resourceVersion: '2.0',
          },
        ],
        setMembers: [],
        descriptions: [
          {
            display:
              'A protozoan disease caused by four species of the genus PLASMODIUM (P. falciparum (MALARIA, FALCIPARUM), P. vivax (MALARIA, VIVAX), P. ovale, and P. malariae) and transmitted by the bite of an infected female mosquito of the genus Anopheles. Malaria is endemic in parts of Asia, Africa, Central and South America, Oceania, and certain Caribbean islands. It is characterized by extreme exhaustion associated with paroxysms of high fever, sweating, shaking chills, and anemia.',
            uuid: '4639FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            description:
              'A protozoan disease caused by four species of the genus PLASMODIUM (P. falciparum (MALARIA, FALCIPARUM), P. vivax (MALARIA, VIVAX), P. ovale, and P. malariae) and transmitted by the bite of an infected female mosquito of the genus Anopheles. Malaria is endemic in parts of Asia, Africa, Central and South America, Oceania, and certain Caribbean islands. It is characterized by extreme exhaustion associated with paroxysms of high fever, sweating, shaking chills, and anemia.',
            locale: 'en',
            links: [
              {
                rel: 'self',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/description/4639FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
              },
              {
                rel: 'full',
                uri:
                  'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/description/4639FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF?v=full',
              },
            ],
            resourceVersion: '1.9',
          },
        ],
        version: null,
        links: [
          {
            rel: 'self',
            uri:
              'http://localhost:8080/openmrshttp://localhost:8080/openmrs/ws/rest/v1/concept/116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          },
        ],
        uuid: '116128AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
    ],
    obsDatetime: '2019-09-06T16:24:11.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000001"}',
    uuid: '19719fad-614a-4e32-903f-0325d0282c11',
  },
  'ee038cc4-1a53-4738-8967-aaa000000002': {
    value: false,
    obsDatetime: '2019-09-06T16:24:18.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000002"}',
    uuid: 'e3eb1593-ea05-4879-9618-196f4a4887d4',
  },
  'ee038cc4-1a53-4738-8967-aaa000000004': {
    value: true,
    obsDatetime: '2019-09-06T16:24:20.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000004"}',
    uuid: 'c24f2753-62c1-49f7-b067-b5cf3ff2be54',
  },
  'ee038cc4-1a53-4738-8967-aaa000000005': {
    value: 2007,
    obsDatetime: '2019-09-06T16:24:29.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000005"}',
    uuid: '6619ffab-53ce-4320-a117-33deead3c88f',
  },
  'ee038cc4-1a53-4738-8967-aaa000000006': {
    value: 'None',
    obsDatetime: '2019-09-06T16:24:37.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000006"}',
    uuid: '36e0e3f4-8808-4df3-8b0d-8517edba0ec7',
  },
  'ee038cc4-1a53-4738-8967-aaa000000007': {
    value: true,
    obsDatetime: '2019-09-06T16:24:37.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000007"}',
    uuid: '9e1f13ae-e6ba-48b4-bc68-c4ea029e7f74',
  },
  encounterDatetime: '2019-09-06T16:25:01.000-0400',
  'ee038cc4-1a53-4738-8967-aaa000000008': {
    value: 'Butt Implant',
    obsDatetime: '2019-09-06T16:24:57.000-0400',
    comment: '{"formField":"ee038cc4-1a53-4738-8967-aaa000000008"}',
    uuid: '2de0e024-30d1-450a-9d0f-98a41b06fe0e',
  },
  encounterUuid: 'acabffdd-6459-48cd-983a-8e3cdd0768a0',
};

export const generalInfoData = {
  '99fab54b-02f7-4782-81c8-ec16ae35f3f4': {
    value: true,
    obsDatetime: '2019-09-30T14:32:09.000-0400',
    comment: '{"formField":"99fab54b-02f7-4782-81c8-ec16ae35f3f4"}',
    uuid: '41d87576-175b-405b-aa60-105246e711dd',
  },
  lastUpdated: '2019-09-30T14:32:12.000-0400',
  encounterUuid: '59c885c8-ae81-4b1a-b386-26b581ba0d58',
  encounterDatetime: '2019-09-30T14:32:11.000-0400',
  '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8': {
    value: '1234',
    uuid: '9e58d02f-afe3-4f81-91ef-8244f87df419',
  },
  '770e1eb5-e4d7-4749-8940-c17fde1b3ef7': {
    value: '123456',
    uuid: '44fdbd82-82db-46bd-a713-55137ad91b05',
  },
  '1b80414c-3ef8-4548-b0d1-cd533d02e1e3': { value: 'ffad' },
};
export const generalInfoMetaData = {
  uuid: '71a643f5-63e1-439f-a8a6-cb4f2bced721',
  name: 'Demographics',
  description:
    "Used to confirm/add/edit client's general information like: file #, address, telephone, education, last period, referrals, etc.",
  retired: false,
  encounterType: {
    uuid: '1ac91513-aba9-4b88-b627-f0489dbfbcdc',
    display: 'Demographics',
  },
  formFields: [
    {
      uuid: 'a8226268-25f7-4796-a02d-1bba1908f54f',
      description: null,
      parent: { uuid: '245f831d-46c5-4027-bc50-ba97c2d2c41b' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Health Facility Referred From',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200091DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Health facility referred from',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: '7feba621-3dfe-437c-9203-60745cfef39a',
        description:
          '{"name":"VcTextField","props":{"vType":"text","customClass": "comm_input"},"validation":{"required":true,"conditions":{"d98dd460-e9e7-40d7-b401-709a1f8f4505":true}}}',
      },
      fieldNumber: 11,
      pageNumber: 1,
    },
    {
      uuid: '162f31c9-64fa-42d9-972f-d38e8f98a141',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Birth companion',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              set: false,
              display: 'Birth companion name',
              datatype: {
                uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Text',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              uuid: '200087DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
          ],
          uuid: '200086DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Birth companion',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: '379ec7dd-ae6b-4d9a-af10-eb2c2df79e34',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 6,
      pageNumber: 1,
    },
    {
      uuid: '97745d78-897c-402b-b647-a865d3d3d2a7',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Referral Out to Community Unit',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              set: false,
              display: 'Community Unit Referred To',
              datatype: {
                uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Text',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              uuid: '200093DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
          ],
          uuid: '200092DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Referral out to community unit',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: '98dd8908-104b-4b16-a465-291f309dd1d9',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 12,
      pageNumber: 1,
    },
    {
      uuid: '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8',
      description: null,
      parent: null,
      field: {
        attributeName: 'identifier',
        concept: null,
        name: 'File number',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e8196-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Database element',
        },
        tableName: 'patient_identifier',
        uuid: '72728d2f-7f0d-4d89-995f-b4793dfddaea',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{}}',
      },
      fieldNumber: 1,
      pageNumber: 1,
    },
    {
      uuid: '770e1eb5-e4d7-4749-8940-c17fde1b3ef7',
      description: null,
      parent: null,
      field: {
        attributeName: 'value',
        concept: null,
        name: 'Telephone number',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e8196-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Database element',
        },
        tableName: 'person_attribute',
        uuid: '0fc00f48-9590-4e57-a0b2-0be32091207e',
        description:
          '{"name":"VcTextField","props":{"vType":"text","min":0,"pattern":"^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$"},"validation":{}}',
      },
      fieldNumber: 3,
      pageNumber: 1,
    },
    {
      uuid: '1b80414c-3ef8-4548-b0d1-cd533d02e1e3',
      description: null,
      parent: null,
      field: {
        attributeName: 'address1',
        concept: null,
        name: 'Address',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e8196-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Database element',
        },
        tableName: 'person_address',
        uuid: 'e16698ce-c292-4050-bf6c-278e43c2334a',
        description:
          '{"name":"VcTextField","props":{"vType":"text","multiline":true,"readOnly":true},"validation":{}}',
      },
      fieldNumber: 2,
      pageNumber: 1,
    },
    {
      uuid: '63b79a7f-068f-4677-9185-13c44c5a5934',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Education Level',
          datatype: {
            uuid: '8d4a48b6-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Coded',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [
            {
              uuid: '159943AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Primary',
              description: {
                uuid: '16472FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                display:
                  'Primary, principal or first (as in qualifier for diagnosis)',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
              set: false,
            },
            {
              uuid: '159944AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Secondary',
              description: {
                uuid: '16473FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                display:
                  'Second or non-primary qualifier value such as for a diagnosis',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
              set: false,
            },
            {
              uuid: '180046DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              display: 'University',
              description: null,
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
              set: false,
            },
            {
              uuid: '5622AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              display: 'Other',
              description: {
                uuid: '2253FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                display:
                  'A generic, descriptive answer which is a handwritten, non-coded response to a question.',
              },
              datatype: {
                uuid: '8d4a4c94-c2cc-11de-8d13-0010c6dffd0f',
                display: 'N/A',
              },
              conceptClass: {
                uuid: '8d492774-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Misc',
              },
              attributes: [],
              set: false,
              answers: [],
            },
          ],
          attributes: [],
          setMembers: [],
          uuid: '200084DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Education level',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'eb1499bd-fe91-4cb2-993e-3cd44f984e44',
        description: '{"name":"VcDropDown","props":{},"validation":{}}',
      },
      fieldNumber: 4,
      pageNumber: 1,
    },
    {
      uuid: 'eb569d3b-1441-46f2-9f31-2230f040bef1',
      description: null,
      parent: { uuid: '162f31c9-64fa-42d9-972f-d38e8f98a141' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Birth companion name',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200087DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Birth companion name',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: '22f8843b-f419-44de-98e3-7ed5259e66e3',
        description:
          '{"name":"VcTextField","props":{"vType":"text"},"validation":{"required":true,"conditions":{"379ec7dd-ae6b-4d9a-af10-eb2c2df79e34":true}}}',
      },
      fieldNumber: 7,
      pageNumber: 1,
    },
    {
      uuid: '245f831d-46c5-4027-bc50-ba97c2d2c41b',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Referral In from Health Facility',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              set: false,
              display: 'Health Facility Referred From',
              datatype: {
                uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Text',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              uuid: '200091DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
          ],
          uuid: '200090DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Referral in from health facility',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: 'd98dd460-e9e7-40d7-b401-709a1f8f4505',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 10,
      pageNumber: 1,
    },
    {
      uuid: 'f69636b0-b575-4fde-9397-834cb4e4b47c',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: true,
          display: 'Referral In from Community Unit',
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [
            {
              set: false,
              display: 'Community Unit Referred From',
              datatype: {
                uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Text',
              },
              conceptClass: {
                uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Question',
              },
              answers: [],
              attributes: [],
              setMembers: [],
              uuid: '200089DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
              description: null,
            },
          ],
          uuid: '200088DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Referral in from community unit',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e836c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Set of Concepts',
        },
        tableName: null,
        uuid: '3bf3e379-d004-4c20-9843-f2ae748aa8fc',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 8,
      pageNumber: 1,
    },
    {
      uuid: '265e5a84-adc8-4353-8220-ebaa305281ca',
      description: null,
      parent: { uuid: 'f69636b0-b575-4fde-9397-834cb4e4b47c' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Community Unit Referred From',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200089DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Community unit referred from',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: '1f0785a5-e867-42fb-ac0a-b8a29b65a6ce',
        description:
          '{"name":"VcTextField","props":{"vType":"text","customClass": "comm_input"},"validation":{"required":true,"conditions":{"3bf3e379-d004-4c20-9843-f2ae748aa8fc":true}}}',
      },
      fieldNumber: 9,
      pageNumber: 1,
    },
    {
      uuid: 'ac8b1221-b1b7-4b50-a851-c6062848bf90',
      description: null,
      parent: { uuid: '97745d78-897c-402b-b647-a865d3d3d2a7' },
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: 'Community Unit Referred To',
          datatype: {
            uuid: '8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Text',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200093DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: 'Community unit referred to',
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: '6b807f18-81d9-409d-b823-83853758afb0',
        description:
          '{"name":"VcTextField","props":{"vType":"text","customClass": "comm_input"},"validation":{"required":true,"conditions":{"98dd8908-104b-4b16-a465-291f309dd1d9":true}}}',
      },
      fieldNumber: 13,
      pageNumber: 1,
    },
    {
      uuid: '99fab54b-02f7-4782-81c8-ec16ae35f3f4',
      description: null,
      parent: null,
      field: {
        attributeName: null,
        concept: {
          set: false,
          display: "Mother's book",
          datatype: {
            uuid: '8d4a5cca-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Boolean',
          },
          conceptClass: {
            uuid: '8d491e50-c2cc-11de-8d13-0010c6dffd0f',
            display: 'Question',
          },
          answers: [],
          attributes: [],
          setMembers: [],
          uuid: '200085DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
          description: null,
        },
        name: "Mother's book",
        selectMultiple: false,
        defaultValue: null,
        fieldType: {
          uuid: '8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f',
          display: 'Concept',
        },
        tableName: null,
        uuid: 'fbdd4887-8f3b-414b-919d-7a9b27534337',
        description: '{"name":"VcGenericSwitch","props":{},"validation":{}}',
      },
      fieldNumber: 5,
      pageNumber: 1,
    },
  ],
  requiredFormFields: {
    'a8226268-25f7-4796-a02d-1bba1908f54f': {
      'd98dd460-e9e7-40d7-b401-709a1f8f4505': true,
    },
    'eb569d3b-1441-46f2-9f31-2230f040bef1': {
      '379ec7dd-ae6b-4d9a-af10-eb2c2df79e34': true,
    },
    '265e5a84-adc8-4353-8220-ebaa305281ca': {
      '3bf3e379-d004-4c20-9843-f2ae748aa8fc': true,
    },
    'ac8b1221-b1b7-4b50-a851-c6062848bf90': {
      '98dd8908-104b-4b16-a465-291f309dd1d9': true,
    },
  },
  fieldToFormFields: {
    '0fc00f48-9590-4e57-a0b2-0be32091207e':
      '770e1eb5-e4d7-4749-8940-c17fde1b3ef7',
    '98dd8908-104b-4b16-a465-291f309dd1d9':
      '97745d78-897c-402b-b647-a865d3d3d2a7',
    'fbdd4887-8f3b-414b-919d-7a9b27534337':
      '99fab54b-02f7-4782-81c8-ec16ae35f3f4',
    '379ec7dd-ae6b-4d9a-af10-eb2c2df79e34':
      '162f31c9-64fa-42d9-972f-d38e8f98a141',
    '1f0785a5-e867-42fb-ac0a-b8a29b65a6ce':
      '265e5a84-adc8-4353-8220-ebaa305281ca',
    'd98dd460-e9e7-40d7-b401-709a1f8f4505':
      '245f831d-46c5-4027-bc50-ba97c2d2c41b',
    '6b807f18-81d9-409d-b823-83853758afb0':
      'ac8b1221-b1b7-4b50-a851-c6062848bf90',
    '72728d2f-7f0d-4d89-995f-b4793dfddaea':
      '2cdcbfb0-0c35-489f-bdb2-53a3ac3dd6a8',
    '3bf3e379-d004-4c20-9843-f2ae748aa8fc':
      'f69636b0-b575-4fde-9397-834cb4e4b47c',
    '22f8843b-f419-44de-98e3-7ed5259e66e3':
      'eb569d3b-1441-46f2-9f31-2230f040bef1',
    'e16698ce-c292-4050-bf6c-278e43c2334a':
      '1b80414c-3ef8-4548-b0d1-cd533d02e1e3',
    '7feba621-3dfe-437c-9203-60745cfef39a':
      'a8226268-25f7-4796-a02d-1bba1908f54f',
    'eb1499bd-fe91-4cb2-993e-3cd44f984e44':
      '63b79a7f-068f-4677-9185-13c44c5a5934',
  },
};
