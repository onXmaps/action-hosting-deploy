/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Context } from "@actions/github/lib/context";

export function getDeployMessage(
  configuredProductionDeployMessage: string,
  ghContext: Context
) {
  let tmpDeployMessage: string = "";
  if (!!configuredProductionDeployMessage) {
    tmpDeployMessage = configuredProductionDeployMessage;
  } else if (ghContext.payload) {
    const commitId = ghContext.payload.head_commit.id.substring(0, 7);
    const commitMessage = ghContext.payload.head_commit.message;
    const author = ghContext.payload.head_commit.author.name ?? "";
    tmpDeployMessage = `commit ${commitId} | ${author} | ${commitMessage}`;
  }
  // Deploy messages must be 255 characters or less
  const MESSAGE_MAX_LENGTH: number = 255;
  if (tmpDeployMessage.length > MESSAGE_MAX_LENGTH) {
    const truncatedMessage: string = tmpDeployMessage.substring(
      0,
      MESSAGE_MAX_LENGTH
    );
    console.log(
      `Deploy message "${tmpDeployMessage}" must be less than ${MESSAGE_MAX_LENGTH} characters. Using "${truncatedMessage}" instead.`
    );
    return truncatedMessage;
  }

  return tmpDeployMessage;
}
