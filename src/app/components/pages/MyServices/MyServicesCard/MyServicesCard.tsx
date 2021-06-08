

import { memo } from "react";
import { createUseClassNames } from "app/theme";
import { Typography } from "onyxia-ui";
import { Button } from "app/theme";
import { useTranslation } from "app/i18n/useTranslations";
import { cx } from "tss-react";
import { capitalize } from "app/tools/capitalize";
import { MyServicesBadge } from "./MyServicesBadge";
import { MyServicesRunningTime } from "./MyServicesRunningTime";
import { IconButton } from "app/theme";

const { useClassNames } = createUseClassNames()(
    theme => ({
        "root": {
            "borderRadius": 8,
            "boxShadow": theme.shadows[1],
            "backgroundColor": theme.colors.useCases.surfaces.surface1,
            "&:hover": {
                "boxShadow": theme.shadows[6]
            },
            "display": "flex",
            "flexDirection": "column"
        },
        "aboveDivider": {
            "padding": theme.spacing(2, 3),
            "borderBottom": `1px solid ${theme.colors.useCases.typography.textTertiary}`,
            "boxSizing": "border-box"
        },
        "title": {
            "marginTop": theme.spacing(2)
        },
        "belowDivider": {
            "padding": theme.spacing(3),
            "paddingTop": theme.spacing(2),
            "flex": 1,
        },
        "timeContainer": {
            "marginLeft": theme.spacing(4)
        },
        "belowDividerTop": {
            "display": "flex",
            "marginBottom": theme.spacing(3)
        }
    })
);

export type Props = {
    className?: string;
    packageIconUrl?: string;
    friendlyName: string;
    packageName: string;
    infoHref: string;
    onRequestDelete(): void;
    openHref: string;
    monitorHref: string;
    //Undefined when the service is not yey launched
    startTime: number | undefined;
    isOvertime: boolean;
};

export const MyServicesCard = memo((props: Props) => {

    const {
        className,
        packageIconUrl,
        friendlyName,
        packageName,
        infoHref,
        onRequestDelete,
        monitorHref,
        openHref,
        startTime,
        isOvertime
    } = props;

    const { classNames } = useClassNames({});

    const { t } = useTranslation("MyServicesCard");

    return (
        <div className={cx(classNames.root, className)}>
            <div className={classNames.aboveDivider}>
                {packageIconUrl !== undefined &&
                    <MyServicesBadge
                        src={packageIconUrl}
                        circleColor={isOvertime ? "red" : startTime === undefined ? "grey" : "green"}
                    />}
                <Typography
                    className={classNames.title}
                    variant="h5"
                >
                    {capitalize(friendlyName)}
                </Typography>

            </div>
            <div className={classNames.belowDivider}>
                <div className={classNames.belowDividerTop}>
                    <div>
                        <Typography variant="caption">{t("service")}</Typography>
                        <Typography variant="subtitle1">
                            {capitalize(packageName)}
                        </Typography>
                    </div>
                    <div className={classNames.timeContainer}>
                        <Typography variant="caption">{t("running since")}</Typography>
                        {
                            startTime === undefined ?
                                <MyServicesRunningTime isRunning={false} /> :
                                <MyServicesRunningTime isRunning={true} isOvertime={isOvertime} startTime={startTime} />
                        }
                    </div>
                </div>
                <div style={{ "display": "flex" }}>
                    <IconButton id="infoOutlined" href={infoHref}/>
                    <IconButton id="delete" onClick={onRequestDelete}/>
                    <IconButton id="equalizer" href={monitorHref}/>
                    <div style={{ "flex": 1 }}/>
                    <Button color="secondary" href={openHref}>{t("open")}</Button>
                </div>

            </div>
        </div>
    );

});

export declare namespace MyServicesCard {

    export type I18nScheme = {
        service: undefined;
        'running since': undefined;
        open: undefined;
    };
}
