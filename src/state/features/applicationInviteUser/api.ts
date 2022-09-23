/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { HttpClient } from '../../../helpers/HttpClient'
import { getApiBase } from '../../../services/EnvironmentService'
import { InvitedUser, InviteNewUser } from './types'
import RequestService from '../../../services/RequestService'

export class Api extends HttpClient {
  private static classInstance?: Api

  public constructor() {
    super(getApiBase())
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api()
    }
    return this.classInstance
  }

  public getRolesComposite = () =>
    this.instance.get<string[]>(
      `/api/registration/rolesComposite`,
      RequestService.getHeaders()
    )

  public getInvitedUsers = (applicationId: string) =>
    this.instance.get<InvitedUser[]>(
      `/api/registration/application/${applicationId}/invitedusers`,
      RequestService.getHeaders()
    )

  public postInviteNewUser = (applicationId: string, user: InviteNewUser) =>
    this.instance.post(
      `/api/registration/application/${applicationId}/inviteNewUser`,
      user,
      RequestService.getHeaders()
    )
}
