(ns clj.basenote.handler
  (:require [compojure.core :refer [defroutes GET POST PUT DELETE]]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [clj.basenote.routes.pages :as pages]
            [ring.middleware.cors :refer [wrap-cors]]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (GET "/pages" [] pages/route-list)
  (GET "/pages/:id" [] pages/route-show)
  (POST "/pages" [] pages/route-create)
  (PUT "/pages/:id" [] pages/route-update)
  (DELETE "/pages/:id" [] pages/route-delete)
  (route/not-found "Not Found"))

(def app
  (-> (wrap-defaults app-routes api-defaults)
      wrap-json-response
      (wrap-json-body {:keywords? true :bigdecimals? true})
      (wrap-cors :access-control-allow-origin [#".*"]
                 :access-control-allow-methods [:get :put :post :delete])))
