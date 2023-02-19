import React from "react";
import IconFont from "@/components/IconFont";
import Login from "@/pages/auth/login";
import WorkplaceLocationTypes from "@/pages/workplace/location-type";
import WorkplaceLocationTypeDetail from "@/pages/workplace/location-type/detail";
import WorkplaceLocations from "@/pages/workplace/location";
import WorkplaceLocationDetail from "@/pages/workplace/location/detail";

type Route = {
  path: string;
  component: any;
};

type SubRoute = {
  title: string;
  path: string;
  route?: Route[];
  subMenu?: SubRoute[];
};

type MultiRoute = {
  path: string;
  title: string;
  role?: string;
  icon: any;
  redirect?: string;
  subMenu: SubRoute[];
};

export const publicRoutes: Route[] = [
  {
    path: "/login",
    component: () => <Login />
  },
  {
    path: "/login_callback",
    component: () => <Login />
  }
];

export const privateRoutes: MultiRoute[] = [
  {
    path: "/workplace",
    title: "Workplace",
    role: "Workplace",
    icon: (
      <IconFont className="icon-menu-color" type="workplace" size="1.571em" />
    ),
    redirect: "/workplace/locations",
    subMenu: [
      {
        title: "Locations",
        path: "/workplace/locations",
        route: [
          {
            path: "/workplace/locations/:id",
            component: () => <WorkplaceLocationDetail />
          },
          {
            path: "/workplace/locations",
            component: () => <WorkplaceLocations />
          }
        ]
      },
      {
        title: "Location Types",
        path: "/workplace/location-types",
        route: [
          {
            path: "/workplace/location-types/:id",
            component: () => <WorkplaceLocationTypeDetail />
          },
          {
            path: "/workplace/location-types",
            component: () => <WorkplaceLocationTypes />
          }
        ]
      }
    ]
  }
];
