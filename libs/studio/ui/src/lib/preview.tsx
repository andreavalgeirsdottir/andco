import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { useMutation } from 'react-query';

import { asLevel } from '@noa/theme';
import { Button, ButtonProps, Dialog, useDialog } from '@noa/ui';
import { request } from '@noa/utils-requests';

import styles from './preview.module.scss';

type RedeployResponse = {
	job: Job;
};
type Job = {
	id: string;
	state: string;
	createdAt: number;
};

export const Preview = ({ editUrl, redeployUrl }: { editUrl?: string; redeployUrl?: string }) => {
	const { asPath } = useRouter();
	const dialog = useDialog();

	const { mutate: triggerRedeploy, isLoading } = useMutation({
		mutationKey: 'redeploy',
		mutationFn: async () => {
			if (!redeployUrl) return;

			return request.get<RedeployResponse>(redeployUrl);
		},
		onError: (error) => {
			console.error('Error - Trigger Redeploy', error);
		},
		onSuccess: (response) => {
			console.info('Success - Trigger Redeploy', response);
		},
		onSettled: dialog.handleClose,
	});

	const buttonProps: ButtonProps = {
		variant: 'plain',
		className: styles.button,
		size: 'medium',
	};

	return (
		<>
			<div className={styles.container}>
				<ul className={styles.ul} {...asLevel(3)}>
					<li>
						<Button
							{...buttonProps}
							icon={{ icon: 'exit', position: 'before', size: 20, scale: 1.1, y: 1 }}
							href={`/api/exit-preview?slug=${asPath}`}
							locale={false}
							passHref
							data-exit
						>
							Exit Preview
						</Button>
					</li>
					{redeployUrl && (
						<li>
							<Button
								{...buttonProps}
								onClick={dialog.handleOpen}
								icon={{ icon: 'clean', position: 'before', size: 20, scale: 1.1 }}
								data-clean
							>
								Clean cache
							</Button>
						</li>
					)}
					{editUrl && (
						<li>
							<Button
								{...buttonProps}
								href={editUrl}
								icon={{ icon: 'edit', position: 'before', size: 20, scale: 1.1 }}
								forceExternal
								data-edit
							>
								Edit in Studio
							</Button>
						</li>
					)}
				</ul>
			</div>
			<Dialog {...dialog} size="small">
				<h5>Clean cache</h5>

				<p>This will trigger a rebuild of all pages. This might take some time to take affect</p>

				<Dialog.Actions
					buttons={[
						{
							id: 'clean',
							onClick: () => triggerRedeploy(),
							priority: 'high',
							icon: { icon: 'clean', size: 16, scale: 1.3 },
							children: 'Clean',
							isLoading,
						},
						{
							id: 'cancel',
							priority: 'medium',
							onClick: dialog.handleClose,
							children: 'Cancel',
						},
					]}
				/>
			</Dialog>
		</>
	);
};

export const exitPreview = (req: NextApiRequest, res: NextApiResponse) => {
	res.clearPreviewData();

	res.writeHead(307, { Location: req?.query?.slug ?? '/' });

	return res.end();
};
