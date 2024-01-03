import { service, request, serviceForMock, requestForMock, mock } from './request';
import * as tools from './tools';

const generators = Object.values(
  import.meta.glob('./modules/*.api.js', { eager: true, import: 'default' })
).map((d) => d);

export default Object.assign(
  {},
  ...generators.map((generator) =>
    generator({
      service,
      request,
      serviceForMock,
      requestForMock,
      mock,
      tools,
    })
  )
);
