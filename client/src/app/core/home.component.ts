import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <div>
          <home-navbar></home-navbar>

        <div class="hero-section">
          <div class="hero-section">
            <h1>Rejoignez notre Salon de Beauté</h1>
            <p class="text-dark">Découvrez un monde de beauté et de détente</p>
            <a href="signup">Commencez votre expérience dès maintenant !</a>
            <br>
            <a href="login">Connectez-vous</a>
          </div>
        </div>
      </div>

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
                          <p>Bienvenue sur la boutique en ligne de notre projet. Découvrez nos produits uniques et
                              tendances.</p>
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
                                  <li><span class="icon icon-map-marker"></span><span class="text">203 Rue Fausse, Ville Imaginaire, Pays des Rêves</span>
                                  </li>
                                  <li><a href="#"><span class="icon icon-phone"></span><span
                                          class="text">+123 456 789</span></a></li>
                                  <li><a href="#"><span class="icon icon-envelope"></span><span class="text">contactnotreboutique.com</span></a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12 text-center">
                      <p>
                          &copy;<script>document.write(new Date().getFullYear());</script>
                          Tous droits réservés | Projet réalisé par Sampilahy Heriniavo Tiany et Ramahenina Ando Mickael
                      </p>
                  </div>
              </div>
          </div>
      </footer>
  `,
  styles: [`
    .hero-section {
      background: #dbcc8f;
      background-size: cover;
      background-position: center;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .hero-section a {
      display: inline-block;
      background-color: #c2a942;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .hero-section a:hover {
      background-color: #958231;
    }
  `]
})
export class HomeComponent {}
