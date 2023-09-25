/**
 * output.cy.ts
 * Definitive e2e tests to see if the correct output is generated
 */

import { deleteDownloadsFolder } from '../utils'
import defaultConfig from "./default.json"
import fullConfig from "./full.json"
import internalChangeConfig from "./internal.json"
import noAITConfig from "./noait.json"

describe('output', () => {
  beforeEach(() => {
    deleteDownloadsFolder()
    cy.visit('/')
  })
  it('creates the correct default output', () => {
    // Skips pre group
    cy.get('[data-cy=button-select]').click()
    // Default to all software
    cy.get('[data-cy=button-next]').click()
    // 0
    cy.get('[data-cy=button-next]').click()
    // 1
    cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
    cy.get('[data-cy=button-next]').click()
    // 2
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 4
    cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
    cy.get('[data-cy=button-next]').click()
    // 5
    cy.get('[data-cy=button-next]').click()
    // 8, sike its 7
    cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review
    cy.get('[data-cy=button-download]').click()
    // Compare output
    cy.readFile("cypress/downloads/config.cfg").then(f => JSON.parse(f)).should('deep.equal', defaultConfig)
  })
  it('reflects fully populated values in output', () => {
    // Skips pre group
    cy.get('[data-cy=button-select]').click()
    // Default to all software
    cy.get('[data-cy=button-next]').click()
    // 0
    cy.get('[data-cy=button-next]').click()
    // 1
    cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
    cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
    cy.get('[data-cy=button-next]').click()
    // 2
    cy.get('[data-cy=textinput-PermissionsBoundaryArn]').focus().type("cypress-pbarn")
    cy.get('[data-cy=textinput-RolePath]').focus().type("cypress-rp")
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 4
    cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
    cy.get('[data-cy=button-next]').click()
    // 6
    cy.get('[data-cy=textinput-HostedZoneID]').focus().type("cypress-hzid")
    cy.get('[data-cy=button-next]').click()
    // 8, sike its 7
    cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review
    cy.get('[data-cy=button-download]').click()
    // Compare output
    cy.readFile("cypress/downloads/config.cfg").then(f => JSON.parse(f)).should('deep.equal', fullConfig)
  })
  it('can handle AIT being skipped', () => {
    // Skips pre group
    cy.get('[data-cy=button-select]').click()
    // Remove AIT from stack
    cy.get('[data-cy=checkbox-AIT]').click()
    cy.get('[data-cy=button-next]').click()
    // 0
    cy.get('[data-cy=button-next]').click()
    // 1
    cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
    cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
    cy.get('[data-cy=button-next]').click()
    // 2
    cy.get('[data-cy=textinput-PermissionsBoundaryArn]').focus().type("cypress-pbarn")
    cy.get('[data-cy=textinput-RolePath]').focus().type("cypress-rp")
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 6
    cy.get('[data-cy=textinput-HostedZoneID]').focus().type("cypress-hzid")
    cy.get('[data-cy=button-next]').click()
    // 8, sike its 7
    cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review
    cy.get('[data-cy=button-download]').click()
    // Compare output
    cy.readFile("cypress/downloads/config.cfg").then(f => JSON.parse(f)).should('deep.equal', noAITConfig)
  })
  it('can handle AIT being selected but later removed', () => {
    // Skips pre group
    cy.get('[data-cy=button-select]').click()
    // Use all software
    cy.get('[data-cy=button-next]').click()
    // 0
    cy.get('[data-cy=button-next]').click()
    // 1
    cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
    cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
    cy.get('[data-cy=button-next]').click()
    // 2
    cy.get('[data-cy=textinput-PermissionsBoundaryArn]').focus().type("cypress-pbarn")
    cy.get('[data-cy=textinput-RolePath]').focus().type("cypress-rp")
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 4
    cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
    cy.get('[data-cy=button-next]').click()
    // 6
    cy.get('[data-cy=textinput-HostedZoneID]').focus().type("cypress-hzid")
    cy.get('[data-cy=button-back]').click()
    // 4
    cy.get('[data-cy=button-back]').click()
    // 3
    cy.get('[data-cy=button-back]').click()
    // 2
    cy.get('[data-cy=button-back]').click()
    // 1
    cy.get('[data-cy=button-back]').click()
    // 0
    cy.get('[data-cy=button-back]').click()
    // Select screen, uncheck AIT
    cy.get('[data-cy=checkbox-AIT]').click()
    // Go through 0, 1, 2, 3, 6
    cy.get('[data-cy=button-next]').click()
    cy.get('[data-cy=button-next]').click()
    cy.get('[data-cy=button-next]').click()
    cy.get('[data-cy=button-next]').click()
    cy.get('[data-cy=button-next]').click()
    cy.get('[data-cy=button-next]').click()
    // 8, sike its 7
    cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review
    cy.get('[data-cy=button-download]').click()
    // Compare output
    cy.readFile("cypress/downloads/config.cfg").then(f => JSON.parse(f)).should('deep.equal', noAITConfig)
  })
  it('can handle internal condition changes', () => {
    // Skips pre group
    cy.get('[data-cy=button-select]').click()
    // Default to all software
    cy.get('[data-cy=button-next]').click()
    // 0
    cy.get('[data-cy=button-next]').click()
    // 1
    cy.get('[data-cy=textinput-ProjectName]').focus().type("cypress-tests")
    cy.get('[data-cy=button-next]').click()
    // 2
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 4
    cy.get('[data-cy=textinput-KeyPairName]').focus().type("cypress-kpn")
    cy.get('[data-cy=button-next]').click()
    // 5
    cy.get('[data-cy=button-next]').click()
    // 8, sike its 7.
    cy.get('[data-cy=textinput-AvailabilityZones]').focus().type("cypress-1a,cypress-1b,cypress-1c")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review, but go back to 8, 5, 4, 3, 2, 1, 0
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    cy.get('[data-cy=button-back]').click()
    // 0, change to deploying in an existing VPC and remove IAM deployal
    cy.get('[data-cy=radio-DeployVpc-false]').click()
    cy.get('[data-cy=radio-DeployIam-false]').click()

    cy.get('[data-cy=button-next]').click()
    // 1, set FQDN
    cy.get('[data-cy=textinput-FQDN]').focus().type("cypress-fqdn")
    cy.get('[data-cy=button-next]').click()
    // 3
    cy.get('[data-cy=button-next]').click()
    // 4
    cy.get('[data-cy=textinput-KeyPairName]').focus().clear().type("cypress-kpn2")
    cy.get('[data-cy=button-next]').click()
    // 6
    cy.get('[data-cy=textinput-HostedZoneID]').focus().type("cypress-hzid")
    cy.get('[data-cy=button-next]').click()
    // 8!
    cy.get('[data-cy=textinput-AccessSgID]').focus().type("cypress-asi")
    cy.get('[data-cy=textinput-VpcId]').focus().type("cypress-vpcid")
    cy.get('[data-cy=textinput-RemoteAccessCIDR]').focus().type("10.0.123.0/24")
    cy.get('[data-cy=button-next]').click()
    // Review
    cy.get('[data-cy=button-download]').click()
    // Compare output
    cy.readFile("cypress/downloads/config.cfg").then(f => JSON.parse(f)).should('deep.equal', internalChangeConfig)
  })
  
  
})

export { }
