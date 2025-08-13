import Settings from '../../icons/Settings'
import Dashboard from '../../icons//Dashboard'
import ManagementIcon from '../../icons/ManagementIcon'
import WithdrawManagementIcon from '../../icons/WithdrawManagementIcon'
import ReconciliationIcon from '../../icons/ReconciliationIcon'
import DepositManagementIcon from '../../icons/DepositManagement'
import SMSLogsIcon from '../../icons/SMSLogsIcon'
import Report from '../../icons/Report'
import Configure from '../../icons/Configure'
import Channels from '../../icons/Channels'
import { Admin } from '../../icons'
import { Payments } from '../../icons'
import { User } from '../../icons'
import SecretKey from '../../icons/SecretKey'
import Configuration from '../../icons/Configuration'
import UserIcon from '../../icons/UserIcon'
import TelegramBot from '../../icons/TelegramBot'
import ClientConfiguration from '../../icons/ClientConfiguration'
import UserAgentIcon from '../../icons/UserAgentIcon'
import UserRoleIcon from '../../icons/UserRoleIcon'
import Permission from '../../icons/Permission'
import Download from '../../icons/Download'
import Upload from '../../icons/Upload'

const useSidebarData = (filters: any[]) => {
	const SIDEBAR_LINKS = [
		filters?.includes('DASHBOARD_SUMMARY') && {
			name: 'Dashboard',
			icon: Dashboard(),
			href: '',
			sublinks: [
				filters?.includes('DASHBOARD_SUMMARY') && {
					id: 1,
					name: 'Summary',
					href: '/dashboard',
				},
			],
		},

		((filters?.includes('DAILY_REPORTS') ||
					filters?.includes('MONTHLY_REPORTS') ||
					filters?.includes('BANKWISE_REPORTS') ||
					filters?.includes('AMOUNTWISE_REPORTS') ||
					filters?.includes('PROJECTWISE_REPORTS') ||
					filters?.includes('AGENTWISE_REPORTS') ||
					filters?.includes('BANKWISE_REPORTS') ||
					filters?.includes('DASHBOARD_30MINDATA'))
        ||
        (filters?.includes('DAILY_PAYOUT_REPORTS') ||
        filters?.includes('MONTHLY_PAYOUT_REPORTS') ||
        filters?.includes('AGENT_PAYOUT_REPORTS') ||
        filters?.includes('PROJECT_PAYOUT_REPORTS'))
        ||
        (filters?.includes('BANK_DAILY_PAYIN_REPORTS') ||
					filters?.includes('BANK_MONTHLY_PAYIN_REPORTS') ||
					filters?.includes('BANK_BANKWISE_PAYIN_REPORTS') ||
					filters?.includes('AGENTWISE_PAYIN') ||
					filters?.includes('PROJECT_WISE_BANKPAYIN'))
      ) && {
			name: 'Reports',
			icon: Report(),
			href: '',
			sublinks: [
				(filters?.includes('DAILY_REPORTS') ||
					filters?.includes('MONTHLY_REPORTS') ||
					filters?.includes('BANKWISE_REPORTS') ||
					filters?.includes('AMOUNTWISE_REPORTS') ||
					filters?.includes('PROJECTWISE_REPORTS') ||
					filters?.includes('AGENTWISE_REPORTS') ||
					filters?.includes('BANKWISE_REPORTS') ||
					filters?.includes('DASHBOARD_30MINDATA')) && {
					name: 'Payin Reports',
					icon: Report(),
					href: '',
					sublinks: [
						filters?.includes('DAILY_REPORTS') && {
							id: 3,
							name: 'Daily Payin',
							href: '/dashboard/reports/walletdailyreport',
						},
						filters?.includes('MONTHLY_REPORTS') && {
							id: 4,
							name: 'Monthly Payin',
							href: '/dashboard/reports/walletmonthlyreport',
						},
						filters?.includes('BANKWISE_REPORTS') && {
							id: 5,
							name: 'BankWise Payin',
							href: '/dashboard/reports/walletbankwisereport',
						},
						filters?.includes('AMOUNTWISE_REPORTS') && {
							id: 25,
							name: 'AmountWise Payin',
							href: '/dashboard/reports/amountwisereport',
						},
						filters?.includes('PROJECTWISE_REPORTS') && {
							id: 27,
							name: 'ProjectWise Payin',
							href: '/dashboard/reports/projectwisereport',
						},
						filters?.includes('AGENTWISE_REPORTS') && {
							id: 28,
							name: 'AgentWise Payin',
							href: '/dashboard/reports/agentwisereport',
						},
						filters?.includes('ACTIVE_BANKWISE_REPORTS') && {
							id: 29,
							name: 'Active Bankwise Payin',
							href: '/dashboard/reports/activebankwisereport',
						},
						filters?.includes('DASHBOARD_30MINDATA') && {
							id: 2,
							name: '30MIN Data',
							href: '/dashboard/banktimedata',
						},
					],
				},
				(filters?.includes('DAILY_PAYOUT_REPORTS') ||
					filters?.includes('MONTHLY_PAYOUT_REPORTS') ||
					filters?.includes('AGENT_PAYOUT_REPORTS') ||
					filters?.includes('PROJECT_PAYOUT_REPORTS')) && {
					name: 'Payout Reports',
					icon: Report(),
					href: '',
					sublinks: [
						filters?.includes('DAILY_PAYOUT_REPORTS') && {
							id: 1,
							name: 'Daily Report',
							href: '/dashboard/reports/dailyreports',
						},
						filters?.includes('MONTHLY_PAYOUT_REPORTS') && {
							id: 2,
							name: 'Monthly Report',
							href: '/dashboard/reports/monthlyreports',
						},
						filters?.includes('AGENT_PAYOUT_REPORTS') && {
							id: 3,
							name: 'Agent Report',
							href: '/dashboard/reports/agentreports',
						},
						filters?.includes('PROJECT_PAYOUT_REPORTS') && {
							id: 4,
							name: 'Project Report',
							href: '/dashboard/reports/projectreports',
						},
					],
				},

				(filters?.includes('BANK_DAILY_PAYIN_REPORTS') ||
					filters?.includes('BANK_MONTHLY_PAYIN_REPORTS') ||
					filters?.includes('BANK_BANKWISE_PAYIN_REPORTS') ||
					filters?.includes('AGENTWISE_PAYIN') ||
					filters?.includes('PROJECT_WISE_BANKPAYIN')) && {
					name: 'Payin Bank',
					icon: Report(),
					href: '',
					sublinks: [
						filters?.includes('BANK_DAILY_PAYIN_REPORTS') && {
							id: 33,
							name: 'Bank Daily Payin',
							href: '/dashboard/reports/bankwisepayin/bankdailypayin',
						},
						filters?.includes('BANK_MONTHLY_PAYIN_REPORTS') && {
							id: 34,
							name: 'Bank Monthly Payin',
							href: '/dashboard/reports/bankwisepayin/maonthlypayin',
						},
						filters?.includes('BANK_BANKWISE_PAYIN_REPORTS') && {
							id: 35,
							name: 'BankWise Payin',
							href: '/dashboard/reports/bankwisepayin/bankpayin',
						},
						filters?.includes('BANK_AGENTWISE_PAYIN') && {
							id: 36,
							name: 'Bank AgentWise Payin',
							href: '/dashboard/reports/bankwisepayin/agentpayin',
						},
						filters?.includes('PROJECT_WISE_BANKPAYIN') && {
							id: 37,
							name: 'ProjectWise Payin',
							href: '/dashboard/reports/bankwisepayin/projectpayin',
						},
					],
				},
			],
		},

		// (filters?.includes("MY_WALLET")) &&
		// {
		//   name: "My Wallet",
		//   icon: ManagementIcon(),
		//   href: "",
		//   sublinks: [
		//     filters?.includes("MY_WALLET") &&
		//     {
		//       id: 9,
		//       icon: WithdrawManagementIcon(),
		//       name: "Wallet",
		//       href: "/dashboard/wallet",
		//     },
		//   ]
		// },

		(filters?.includes('ORDER') ||
			filters?.includes('PAYIN_ACCOUNT') ||
			filters?.includes('REVIEW_ORDER')) && {
			name: 'Transaction Management',
			icon: ManagementIcon(),
			href: '',
			sublinks: [
				filters?.includes('ORDER') && {
					id: 7,
					icon: WithdrawManagementIcon(),
					name: 'UPI Transaction',
					href: '/dashboard/payin',
				},
				filters?.includes('PAYIN_ACCOUNT') && {
					id: 7,
					icon: WithdrawManagementIcon(),
					name: 'Account Transaction',
					href: '/dashboard/payinaccount',
				},

				filters?.includes('REVIEW_ORDER') && {
					id: 8,
					icon: WithdrawManagementIcon(),
					name: 'Review Order',
					href: '/dashboard/revieworder',
				},
			],
		},
		(filters?.includes('WITHDRAWALS') ||
			filters?.includes('WITHDRAWAL_BANKS') ||
			filters?.includes('UPLOADS') ||
			filters?.includes('DOWNLOADS')) && {
			name: 'Payout Management',
			icon: ManagementIcon(),
			href: '',
			sublinks: [
				filters?.includes('WITHDRAWALS') && {
					id: 6,
					icon: WithdrawManagementIcon(),
					name: 'Payout',
					href: '/dashboard/withdrawals',
				},
				filters?.includes('DOWNLOADS') && {
					id: 22,
					name: 'Downloads',
					icon: Download(),
					href: '/dashboard/withdrawaldownload',
				},
				filters?.includes('UPLOADS') && {
					id: 23,
					icon: Upload(),
					name: 'Uploads',
					href: '/dashboard/withdrawuploads',
				},
				filters?.includes('WITHDRAWAL_BANKS') && {
					id: 19,
					icon: DepositManagementIcon(),
					name: 'Withdrawal Banks',
					href: '/dashboard/bankwithdrawls',
				},
				filters?.includes('WITHDRAWAL_STATEMENT') && {
					id: 24,
					icon: DepositManagementIcon(),
					name: 'Withdraw Statement',
					href: '/dashboard/withdrawstatement',
				},
			],
		},
		(filters?.includes('BANK_DETAILS') ||
			filters?.includes('BANK_STATEMENT') ||
			filters?.includes('ORDER_RECONCILIATION') ||
			filters?.includes('UPI_RECONCILIATION') ||
			filters?.includes('SMS_LOGS')) && {
			name: 'Banking',
			icon: Payments(),
			href: '',
			sublinks: [
				filters?.includes('BANK_DETAILS') && {
					id: 8,
					icon: WithdrawManagementIcon(),
					name: 'Payin Banks',
					href: '/dashboard/bank',
				},
				filters?.includes('BANK_STATEMENT') && {
					id: 9,
					icon: DepositManagementIcon(),
					name: 'Deposit Statement',
					href: '/dashboard/bankstatement',
				},
				filters?.includes('ORDER_RECONCILIATION') && {
					id: 7,
					icon: ReconciliationIcon(),
					name: 'Reconciliation',
					href: '/dashboard/reconciliation',
				},
				filters?.includes('UPI_RECONCILIATION') && {
					id: 26,
					icon: ReconciliationIcon(),
					name: 'UPI Reconciliation',
					href: '/dashboard/upireconciliation',
				},
				filters?.includes('SMS_LOGS') && {
					id: 36,
					icon: SMSLogsIcon(),
					name: 'SMS Logs',
					href: '/dashboard/smslogs',
				},
			],
		},
		(filters?.includes('USER') ||
			filters?.includes('LOGIN_ACTIVITY') ||
			filters?.includes('AGENT_USER')) && {
			name: 'User',
			icon: User(),
			href: '',
			sublinks: [
				filters?.includes('USER') && {
					id: 11,
					icon: UserIcon(),
					name: 'User',
					href: '/dashboard/user',
				},
				filters?.includes('AGENT_USER') && {
					id: 29,
					icon: UserAgentIcon(),
					name: 'Agent User',
					href: '/dashboard/agentuser',
				},
			],
		},
		(filters?.includes('ADMIN_ROLE') ||
			filters?.includes('ADMIN_USER_PERMISSION')) && {
			name: 'Settings',
			icon: Settings(),
			href: '',
			sublinks: [
				{
					name: 'Admin',
					icon: Admin(),
					href: '',
					sublinks: [
						filters?.includes('ADMIN_ROLE') && {
							id: 13,
							icon: UserRoleIcon(),
							name: 'Role',
							href: '/dashboard/admin/role/createRoleTable',
						},
						filters?.includes('ADMIN_USER_PERMISSION') && {
							id: 14,
							icon: Permission(),
							name: 'Permission',
							href: '/dashboard/permission',
						},
					],
				},
				(filters?.includes('PAYMENT_TEMPLATE') ||
					filters?.includes('CLIENT_CONFIGURATION') ||
					filters?.includes('TEMPLATE_BOT') ||
					filters?.includes('SECRETKEY')) && {
					name: 'Config',
					icon: Configuration(),
					href: '',
					sublinks: [
						filters?.includes('PAYMENT_TEMPLATE') && {
							id: 15,
							icon: Payments(),
							name: 'Payment Template',
							href: '/dashboard/paymentTemplate',
						},
						filters?.includes('CLIENT_CONFIGURATION') && {
							id: 16,
							icon: ClientConfiguration(),
							name: 'Client Configuration',
							href: '/dashboard/clientConfiguration',
						},
						filters?.includes('TEMPLATE_BOT') && {
							id: 17,
							icon: TelegramBot(),
							name: 'Telegram Bot',
							href: '/dashboard/telegrambot',
						},
						filters?.includes('SECRETKEY') && {
							id: 18,
							icon: SecretKey(),
							name: 'SecretKey',
							href: '/dashboard/secretKey',
						},
					],
				},
				filters?.includes('CHANNELS') && {
					name: 'Channels',
					icon: Channels(),
					href: '/dashboard/channels',
				},
			],
		},
	].filter(Boolean)
	return SIDEBAR_LINKS
}

export default useSidebarData
