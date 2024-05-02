// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};
const board: NavItemType = {
  id: '게시판',
  title: <FormattedMessage id="게시판" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'board',
      title: <FormattedMessage id="게시판 페이지" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'slipFormPage',
          title: <FormattedMessage id="직원게시판" />,
          type: 'item',
          url: '/board/BoardList'
        }
        ]
    }]
  }

export default board