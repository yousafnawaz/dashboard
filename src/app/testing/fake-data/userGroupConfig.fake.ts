import {UserGroupConfig} from '../../shared/model/Config';

export function fakeUserGroupConfig(): UserGroupConfig {
  return {
    owners: {
      projects: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      members: {
        view: true,
        edit: true,
        remove: true,
        invite: true,
      },
      sshKeys: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      clusters: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      nodes: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      nodeDeployments: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      serviceaccounts: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      serviceaccountToken: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
    },
    editors: {
      projects: {
        view: true,
        edit: true,
        create: true,
        delete: false,
      },
      members: {
        view: false,
        edit: false,
        remove: false,
        invite: false,
      },
      sshKeys: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      clusters: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      nodes: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      nodeDeployments: {
        view: true,
        edit: true,
        create: true,
        delete: true,
      },
      serviceaccounts: {
        view: false,
        edit: false,
        create: false,
        delete: false,
      },
      serviceaccountToken: {
        view: false,
        edit: false,
        create: false,
        delete: false,
      },
    },
    viewers: {
      projects: {
        view: true,
        edit: false,
        create: true,
        delete: false,
      },
      members: {
        view: false,
        edit: false,
        remove: false,
        invite: false,
      },
      sshKeys: {
        view: true,
        edit: false,
        create: false,
        delete: false,
      },
      clusters: {
        view: true,
        edit: false,
        create: false,
        delete: false,
      },
      nodes: {
        view: true,
        edit: false,
        create: false,
        delete: false,
      },
      nodeDeployments: {
        view: true,
        edit: false,
        create: false,
        delete: false,
      },
      serviceaccounts: {
        view: false,
        edit: false,
        create: false,
        delete: false,
      },
      serviceaccountToken: {
        view: false,
        edit: false,
        create: false,
        delete: false,
      },
    },
  };
}
