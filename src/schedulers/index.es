import command from '../commands/example';

export default {
  name: 'Example',
  description: 'Example',
  schedule: '00 */1 * * * *',
  do: command.action
};
