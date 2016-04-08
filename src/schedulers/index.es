import command from '../commands/index';

export default {
  name: 'Example',
  description: 'Example',
  schedule: '00 */1 * * * *',
  do: command.action
};
