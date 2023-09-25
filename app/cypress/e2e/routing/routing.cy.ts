/**
 * routing.cy.ts
 * tests to make sure we are going to the right places
 */

describe("routing", () => {
  beforeEach(() => cy.visit("/"))
  it("starts at home", () => cy.contains("div", "Is AST Right for You?"))
  context("-> select", () => {
    beforeEach(() => cy.get('[data-cy=button-select]').click())
    it("routed to the select screen", () => cy.contains("div", "Catalogue Checklist"))
    context("-> home", () => {
      beforeEach(() => cy.get('[data-cy=button-back]').click())
      it("can return home", () => cy.contains("div", "Is AST Right for You?"))
    })
    context("-> post", () => {
      beforeEach(() => cy.get('[data-cy=button-next]').click())
      it("goes through default form routing correctly and ends at review", () => {
        // 0
        cy.contains("p", "How would you like to manage DNS records for your deployment?")
        cy.get('[data-cy=button-next]').click()
        // 1
        cy.contains("p", "URL to use for the project-resources root.")
        cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
        cy.get('[data-cy=button-next]').click()
        // 2
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-next]').click()
        // 3
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-next]').click()
        // 4
        cy.contains("p", "Instance type to be used for AIT.")
        cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
        cy.get('[data-cy=button-next]').click()
        // 5
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
        cy.get('[data-cy=button-next]').click()
        // 8
        cy.contains("p", "Availability Zones to use for the subnets in the VPC. ")
        cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
        cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
        cy.get('[data-cy=button-next]').click()
        // Review
        cy.contains("h2", "Review Configuration and Download")
      })
      it("can go back to select", () => {
        cy.get('[data-cy=button-back]').click()
        cy.contains("div", "Catalogue Checklist")
      })
      it("can internally go back + can handle internal navigation changes", () => {
        // 0
        cy.contains("p", "How would you like to manage DNS records for your deployment?")
        cy.get('[data-cy=button-next]').click()
        // 1
        cy.contains("p", "URL to use for the project-resources root.")
        cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
        cy.get('[data-cy=button-next]').click()
        // 2
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-next]').click()
        // 3
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-next]').click()
        // 4
        cy.contains("p", "Instance type to be used for AIT.")
        cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
        cy.get('[data-cy=button-next]').click()
        // 5
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
        cy.get('[data-cy=button-next]').click()
        // go back to 5,4,3,2,1
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "Instance type to be used for AIT.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "URL to use for the project-resources root.")
        // Fill in FQDN
        cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
        // Go to 2,3,4,6
        cy.get('[data-cy=button-next]').click()
        cy.get('[data-cy=button-next]').click()
        cy.get('[data-cy=button-next]').click()
        cy.get('[data-cy=button-next]').click()
        // Confirm that rather than seeing the load balancer prompt we now see the HostedZoneId prompt
        cy.contains("p", "(Optional) ID of the Route 53 hosted-zone domain.")
      })
      it("can handle external navigation changes", () => {
        // 0
        cy.contains("p", "How would you like to manage DNS records for your deployment?")
        cy.get('[data-cy=button-next]').click()
        // 1
        cy.contains("p", "URL to use for the project-resources root.")
        cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
        cy.get('[data-cy=button-next]').click()
        // 2
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-next]').click()
        // 3
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-next]').click()
        // 4
        cy.contains("p", "Instance type to be used for AIT.")
        cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
        cy.get('[data-cy=button-next]').click()
        // 5
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
        cy.get('[data-cy=button-next]').click()
        // go back to 5,4,3,2,1
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "Instance type to be used for AIT.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-back]').click()
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-back]').click()       
        cy.contains("p", "URL to use for the project-resources root.")
        cy.get('[data-cy=button-back]').click()       
        cy.contains("p", "How would you like to manage DNS records for your deployment?")
        cy.get('[data-cy=button-back]').click()
        cy.get('[data-cy=checkbox-AIT]').click()
        // go forward to 0, 1, 2, 3, 5.
        cy.get('[data-cy=button-next]').click()
        // 0
        cy.contains("p", "How would you like to manage DNS records for your deployment?")
        cy.get('[data-cy=button-next]').click()
        // 1
        cy.contains("p", "URL to use for the project-resources root.")

        cy.get('[data-cy=button-next]').click()
        // 2
        cy.contains("p", "(Optional) Amazon Resource Name of a managed policy in your account to be used as the permissions boundary.")
        cy.get('[data-cy=button-next]').click()
        // 3
        cy.contains("p", "Name of the S3 bucket for your copy of the Quick Start assets.")
        cy.get('[data-cy=button-next]').click()
        // 5, 4 gets skipped becuase AIT was deselected
        cy.contains("p", "(Optional) Amazon Resource Name of the SSL certificate to use for the load balancer.")
      })
    })
  })
  context("-> pre", () => {
    beforeEach(() => cy.get('[data-cy=button-ques]').click())
    it("routed to the pre group", () => cy.contains("p", "Do you need data visualization?"))
    context("-> select", () => {
      beforeEach(() => cy.get('[data-cy=button-next]').click())
      it("routed to the select screen", () => cy.contains("div", "Catalogue Checklist"))
      context("-> pre", () => {
        beforeEach(() => cy.get('[data-cy=button-back]').click())
        it("can return to the pre group", () => cy.contains("p", "Do you need data visualization?"))
      })
    })
  }) 
})

export { }
