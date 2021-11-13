const taskView = [
  {
    title: 'Delinquency',
    route: 'task-view-delinquency',
    tag: '1',
    tagVariant: 'light-warning',
  },
  {
    title: 'Eviction',
    route: 'task-view-eviction',
    tag: '1',
    tagVariant: 'light-warning',
  },
  {
    title: 'Foreclosure',
    route: 'task-view-foreclosure',
    tag: null,
    tagVariant: 'light-warning',
  },
  {
    title: 'Probate',
    route: 'task-view-probate',
    tag: null,
    tagVariant: 'light-warning',
  },
  {
    title: 'Tax Auction',
    route: 'task-view-tax-auction',
    tag: null,
    tagVariant: 'light-warning',
  },
]

export default [
  {
    title: 'Import Tool',
    icon: 'FileIcon',
    children: [
      {
        title: 'Upload File',
        route: 'upload-file',
      },
      {
        title: 'Task View',
        children: taskView,
      },
    ],
  },
  {
    title: 'Property Stack',
    route: null,
    icon: 'HomeIcon',
  },
]
