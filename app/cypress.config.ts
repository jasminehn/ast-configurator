import { defineConfig } from "cypress";
import { rmdir } from "fs";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteFolder(folderName) {
          //console.log('deleting folder %s', folderName)
    
          return new Promise((resolve, reject) => {
            rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                // this doesn't matter
              }
              resolve(null)
            })
          })
        },
      })
    },
    baseUrl: "http://localhost:3000",
    trashAssetsBeforeRuns: true
  },
});
