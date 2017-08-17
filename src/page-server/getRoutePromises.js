import { matchPath } from 'react-router-dom';

/**
 * @param appRoutes
 * @param ctx
 * @param dispatch
 * @param promises
 * @param context
 * @returns {*}
 */
function getRoutePromises(appRoutes, ctx, dispatch, promises = [], context) {
  if (!(Array.isArray(appRoutes) && appRoutes.length)) {
    return promises;
  }

  const route = appRoutes.find(route => {
    const match = matchPath(ctx.url.split('?')[0], route);
    if ((match || !route.path) && route.component && route.component.preload) {
      if (route.preloaderOnlyWhenExact) {
        if (matchPath(ctx.url.split('?')[0], { ...route, exact: true })) {
          promises.push(route.component.preload(dispatch, ctx, context));
        }
      } else {
        promises.push(route.component.preload(dispatch, ctx, context));
      }
    }
    if (match || !route.path) {
      return route;
    }

    return match;
  });

  if (route) {
    return getRoutePromises(route.routes, ctx, dispatch, promises, context);
  }

  return promises;
}

export default getRoutePromises;
