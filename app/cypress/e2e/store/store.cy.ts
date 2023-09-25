
describe("the store", () => {
  beforeEach(() => cy.visit("/"));
  // @ts-ignore
  it("exists", () => {
    cy.window().its("store").invoke("getState").should("exist");
  });
  context("controller", () => {
    it("initializes controllers correctly", () => {
      cy.window()
        .its("store")
        .invoke("getState")
        .its("controller")
        .its("store")
        .should("deep.equal", [
          { id: "0.UseRoute53", value: "true" },
          { id: "0.DeployIam", value: "true" },
          { id: "0.DeployLoggings", value: "true" },
          { id: "0.DeployBastion", value: "true" },
          { id: "0.EnableEfsBackups", value: "true" },
          { id: "0.DeployVpc", value: "true" },
          { id: "1.FQDN", value: "" },
        ]);
    });
    it("can properly set and test its values", () => {
      cy.window().its("store").its("dispatch").its("controller").invoke("testCondition", {condition: {question: "1.FQDN", is: "==", to: "foo"}}).should("not.be.true")
      cy.window().its("store").its("dispatch").its("controller").invoke("testCondition", {condition: {question: "1.FQDN", is: "!=", to: "foo"}}).should("be.true")
      cy.window().its("store").its("dispatch").its("controller").invoke("testCondition", {condition: {question: "_SELECT", is: "excludes", to: "AIT"}}).should("be.true")
      cy.window().its("store").its("dispatch").its("controller").invoke("testCondition", {condition: {question: "_SELECT", is: "includes", to: "AIT"}}).should("not.be.true")
    })
    it("responds immediately to controller changes", () => {
      cy.get('[data-cy=button-select]').click()
      cy.get('[data-cy=button-next]').click()
      cy.get('[data-cy=radio-DeployVpc-false]').click()
      const getValue = (win: any) => win.store.getState().controller.store.find((v: {id: string, value: string}) => v.id === "0.DeployVpc").value
      cy.window().pipe(getValue).should("eq", "false");
    })
    it("gives good default getFirst and getLast", () => {
      // The default firsts and lasts
      cy.window().its("store").its("dispatch").its("controller").invoke("getFirst", "pre").should("eq", "pre1")
      cy.window().its("store").its("dispatch").its("controller").invoke("getLast", "pre").should("eq", "pre1")
      cy.window().its("store").its("dispatch").its("controller").invoke("getFirst", "post").should("eq", "0")
      cy.window().its("store").its("dispatch").its("controller").invoke("getLast", "post").should("eq", "7")
    })
    it("gives good default getPrevious and getNext", () => {
      // The default firsts and lasts
      cy.window().its("store").its("dispatch").its("controller").invoke("getPrevious", "pre1").should("be.undefined")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "pre1").should("be.undefined")
      cy.window().its("store").its("dispatch").its("controller").invoke("getPrevious", "0").should("be.undefined")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "8").should("be.undefined")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "7").should("be.undefined")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "0").should("eq", "1")
      cy.window().its("store").its("dispatch").its("controller").invoke("getPrevious", "1").should("eq", "0")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "1").should("eq", "2")
      cy.window().its("store").its("dispatch").its("controller").invoke("getPrevious", "2").should("eq", "1")
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "2").should("eq", "3")
      // Fun case when _SELECT hasn't even been set up yet
      cy.window().its("store").its("dispatch").its("controller").invoke("getNext", "3").should("eq", "5")

    })
  })
  context("bank", () => {
    it("initialized", () => {
      cy.window().its("store").invoke("getState").its("bank").its("store").should("have.length.above", 0)
    })
    it("can properly query its values", () => {
      // Use dispatch to get section
      const getSection = (win: any) => win.store.dispatch.bank.getSection("pre1")
      // Store is setup so that pre1 should be the first section
      const getSectionFromStore = (win: any) => win.store.getState().bank.store[0].values.map((v: {id: string, value: string}) => v.value)
      cy.window().pipe(getSection).should("deep.equal", ["yes", "yes", "seq"])
      cy.window().pipe(getSectionFromStore).should("deep.equal", ["yes", "yes", "seq"])
    })
    it("updates on forward navigation", () => {
      cy.get('[data-cy=button-ques]').click()
      const getSection = (win: any) => win.store.dispatch.bank.getSection("pre1")
      cy.window().pipe(getSection).should("deep.equal", ["yes", "yes", "seq"])
      cy.get('[data-cy=radio-1-no]').click()
      cy.window().pipe(getSection).should("deep.equal", ["yes", "yes", "seq"])
      cy.get('[data-cy=button-next]').click()
      cy.window().pipe(getSection).should("deep.equal", ["no", "yes", "seq"])
    })
    it("updates on back navigation", () => {
      cy.get('[data-cy=button-ques]').click()
      const getSection = (win: any) => win.store.dispatch.bank.getSection("pre1")
      cy.window().pipe(getSection).should("deep.equal", ["yes", "yes", "seq"])
      cy.get('[data-cy=radio-1-no]').click()
      cy.window().pipe(getSection).should("deep.equal", ["yes", "yes", "seq"])
      cy.get('[data-cy=button-back]').click()
      cy.window().pipe(getSection).should("deep.equal", ["no", "yes", "seq"])
    })

  })
  context("software", () => {
    it("defaults all software to true when skipping questionnaire", () => {
      cy.get('[data-cy=button-select]').click()
      // Using this pipe method to account for page loading. Normally cypress retries "should" until timeout
      // but using pipe() allows us to requery with each retry
      const getSelect = (win: any) => win.store.getState().select.store.map((s: {id: string, state: boolean | undefined}) => s.state)
      cy.window().pipe(getSelect).should("deep.equal", [true, true, true, true])
    })
    it("properly updates with selected software", () => {
      cy.get('[data-cy=button-select]').click()
      cy.get('[data-cy=checkbox-Merlin]').click()
      const getSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state).map((s: {id: string, state: boolean | undefined}) => s.id)

      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Falcon"])
      cy.get('[data-cy=checkbox-Merlin]').click()
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Merlin", "Falcon"])
    }) 
    it("properly returns if software is selected with isSelected", () => {
      cy.get('[data-cy=button-select]').click()
      const getMerlinSelected = (win: any) => win.store.dispatch.select.isSelected("Merlin")
      cy.window().pipe(getMerlinSelected).should("be.true")
      cy.get('[data-cy=checkbox-Merlin]').click()
      cy.window().pipe(getMerlinSelected).should("not.be.true")
      cy.get('[data-cy=checkbox-Merlin]').click()
      cy.window().pipe(getMerlinSelected).should("be.true")

    })
    it('properly updates with select/deselect all', () => {
      cy.get('[data-cy=button-select]').click()
      cy.get('[data-cy=checkbox-all]').click()
      const getSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state).map((s: {id: string, state: boolean | undefined}) => s.id)
      const getNotSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state === false && s !== undefined).map((s: {id: string, state: boolean | undefined}) => s.id)
      cy.window().pipe(getNotSelected).should("deep.equal", ["AIT", "OpenMCT", "Merlin", "Falcon"])
      cy.window().pipe(getSelected).should("deep.equal", [])
      cy.get('[data-cy=checkbox-all]').click()
      cy.window().pipe(getNotSelected).should("deep.equal", [])
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Merlin", "Falcon"])
      
    })
    it('does not reset when non-deps are changed', () => {
      // Skips pre group
      cy.get('[data-cy=button-select]').click()
      // Deselect Merlin
      cy.get('[data-cy=checkbox-Merlin]').click()
      cy.get('[data-cy=button-next]').click()
      // Make unrelated changes later, 0
      cy.get('[data-cy=button-next]').click()
      // 1
      cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
      cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
      cy.get('[data-cy=button-next]').click()
      // 2
      cy.get('[data-cy=textinput-PermissionsBoundaryArn]').focus().type("cypress-pbarn")
      cy.get('[data-cy=textinput-RolePath]').focus().type("cypress-rp")
      cy.get('[data-cy=button-next]').click()
      // Go back to 2, 1, 0, select
      cy.get('[data-cy=button-back]').click()
      cy.get('[data-cy=button-back]').click()
      cy.get('[data-cy=button-back]').click()
      cy.get('[data-cy=button-back]').click()
      const getSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state).map((s: {id: string, state: boolean | undefined}) => s.id)
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Falcon"])
      // now try with going before questionnaire
      cy.get('[data-cy=button-back]').click()
      // and go back to select via questionnaire. Default questionnaire values include all software, so store shouldn't change.
      cy.get('[data-cy=button-ques]').click()
      cy.get('[data-cy=button-next]').click()
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Falcon"])


    })
    it("reflects different values within pre", () => {
      cy.get('[data-cy=button-ques]').click()
      cy.get('[data-cy=radio-2-no]').click()
      cy.get('[data-cy=radio-3-single]').click()
      cy.get('[data-cy=button-next]').click()
      const getSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state).map((s: {id: string, state: boolean | undefined}) => s.id)
      const getHidden = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state === undefined).map((s: {id: string, state: boolean | undefined}) => s.id)
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT"])
      cy.window().pipe(getHidden).should("deep.equal", ["Merlin", "Falcon"])
    })
    it("can adapt to changes in tool flow", () => {
      cy.get('[data-cy=button-select]').click()
      const getSelected = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state).map((s: {id: string, state: boolean | undefined}) => s.id)
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT", "Merlin", "Falcon"])
      cy.get('[data-cy=button-back]').click()
      cy.get('[data-cy=button-ques]').click()
      cy.get('[data-cy=radio-2-no]').click()
      cy.get('[data-cy=radio-3-single]').click()
      cy.get('[data-cy=button-next]').click()
      const getHidden = (win: any) => win.store.getState().select.store.filter((s: {id: string, state: boolean | undefined}) => s.state === undefined).map((s: {id: string, state: boolean | undefined}) => s.id)
      cy.window().pipe(getSelected).should("deep.equal", ["AIT", "OpenMCT"])
      cy.window().pipe(getHidden).should("deep.equal", ["Merlin", "Falcon"])
    })
  })

});

export { };
