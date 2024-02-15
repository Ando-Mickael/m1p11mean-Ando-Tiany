import { Component } from '@angular/core';

@Component({
  selector: 'client-home',
  template: `
    <div>
      <client-navbar></client-navbar>

      <client-notifications></client-notifications>

      <client-preferences></client-preferences>

      <router-outlet></router-outlet>

      <footer class="ftco-footer ftco-section">
        <div class="container">
          <div class="row">
            <div class="mouse">
              <a href="#" class="mouse-icon">
                <div class="mouse-wheel"><span class="ion-ios-arrow-up"></span></div>
              </a>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Notre Boutique</h2>
                <p>Bienvenue sur la boutique en ligne de notre projet. Découvrez nos produits uniques et tendances.</p>
                <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                  <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                  <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                  <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4 ml-md-5">
                <h2 class="ftco-heading-2">Menu</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="py-2 d-block">Boutique</a></li>
                  <li><a href="#" class="py-2 d-block">À Propos</a></li>
                  <li><a href="#" class="py-2 d-block">Blog</a></li>
                  <li><a href="#" class="py-2 d-block">Contact</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Aide & Assistance</h2>
                <div class="d-flex">
                  <ul class="list-unstyled mr-l-5 pr-l-3 mr-4">
                    <li><a href="#" class="py-2 d-block">Livraison et Retours</a></li>
                    <li><a href="#" class="py-2 d-block">FAQ</a></li>
                  </ul>
                  <ul class="list-unstyled">
                    <li><a href="#" class="py-2 d-block">Contactez-nous</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">Besoin d'aide ?</h2>
                <div class="block-23 mb-3">
                  <ul>
                    <li><span class="icon icon-map-marker"></span><span class="text">203 Rue Fausse, Ville Imaginaire, Pays des Rêves</span></li>
                    <li><a href="#"><span class="icon icon-phone"></span><span class="text">+123 456 789</span></a></li>
                    <li><a href="#"><span class="icon icon-envelope"></span><span class="text">contactnotreboutique.com</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <p>
                &copy;<script>document.write(new Date().getFullYear());</script> Tous droits réservés | Projet réalisé par Sampilahy Heriniavo Tiany et Ramahenina Ando Mickael
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class ClientHomeComponent {}
