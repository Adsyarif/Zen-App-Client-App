## Zen-App

“Zen-App: 
Mental health is gaining attention worldwide, including in Indonesia. Despite growing awareness of its importance, stigma and a lack of understanding still prevent many from seeking help. 
The Zenzone App aims to bridge this gap by offering essential support and resources." This is where the role of the Zenzone App is highly needed to provide the right support and resources.


## Table of Contents

1. [Zen-App](#Zen-App)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Deployment](#deployment)
5. [Tech Stack](#tech-stack)
   - [Languages](#languages)
   - [Libraries and Dependencies](#libraries-and-dependencies)
   - [Database](#database)
   - [Design Tools](#design-tools)
6. [User FLow](#user-flow)
7. [Pages](#pages)
   - [Homepage](#homepage-)
   - [Category Page](#category-page-)
   - [Results Page](#results-page-based-on-gender-and-categories)
   - [Product Detail Page](#product-detail-page--product_id-)
8. [Feature](#feature)
   - [Filtering Option](#filtering-option)
   - [Sorting Functionality](#sorting-functionality)
   - [WhatsApp Integration for Rental](#whatsapp-integration-for-rental)
9. [Prerequisites](#prerequisites)
10. [Run in Local](#run-in-local)
   - [Clone or Pulling from Repo](#clone-or-pulling-from-repo)
   - [Optional Checkout](#optional)
   - [Install Dependency](#instal-dependency)
   - [Run](#run)
   - [Test Build/Deployment](#test-builddeployment)
11. [Folder Structure](#folder-structure)
12. [Future Development Features](#future-development-features)
13. [Team Developer]()


## Problem Statement

-. Increasing Cases of Mental Disorders:
Mental disorders such as stress, anxiety, depression, and other conditions are becoming more common, especially among the younger generation. Rapid changes in lifestyle, academic pressure, and social expectations can be triggering factors.
-. Lack of Access to Mental Health Services:
Many people find it difficult to access quality and affordable mental health services. The limited number of mental health professionals and high service costs often become major obstacles for many individuals to get the help they need.
-. Negative Stigma:
There is still a lot of negative stigma related to mental disorders in society, making people reluctant to acknowledge their problems or seek help. The fear of negative judgment or discrimination often prevents individuals from openly discussing their mental health and getting the necessary treatment.

## Solution

The Zenzone App is developed to address mental health issues by increasing awareness, providing support, facilitating access to resources, encouraging help-seeking behavior, and reducing stigma. It offers a safe online community, accurate information, and tools to manage mental health, thus bridging the gap between individuals and quality mental health care.

## Deployment

- Backend Repository :
- Platform : 

## Tech stack

### Languages

- Javascript
- Typescript
- HTML
- CSS

### Libraries and dependencies

- Next
- Yarn
- Axios
- Tailwind CSS

### Database

- Supabase 

### Design Tools 

- Figma

## User Flow

![User Flow](./src/assets/doc/userFlow.png)

## Pages

- Homepage = "/homepage"

  ![Home Page]()

  **Usage**: Explore featured items and navigate through different sections of the platform such as banner, product links and login feature
  
- Register = "/register"

  ![register]()

  **Usage**: user signup for an account
  
- Login = "/login"

  ![login]()

  **Usage**: user signin for an account

- Results page (Based on gender and categories)

  - "/:gender" , example : "/men" or "/women"
  - "/:category/:gender", example : "tops/women"

    ![Results Page]()

  **Usage**: After choosing which gender are they, user can manually filter spesific things for instance: Filter base on size, color and etc. (Read feature section)

- Product detail page : "/productDetail/:product_id" , example : "productDetail/35"

  ![Product Detail Page](./src/assets/doc/productDetailPage.png)

## Feature

### Filtering Options
   - **Gender**: Filter products based on gender (e.g., Men, Women).
   - **Color**: Select products based on available colors.
   - **Size**: Filter by available sizes to find the perfect fit.
   - **Material**: Choose products based on the material they are made of.
   - **Brand**: Filter by brand to find items from preferred designers.
   - **Availability**: Check product availability to ensure items are in stock.

  
### Sorting Functionality
  -  **Newest**: Sort products by the newest arrivals to stay updated with the latest trends.
  -  **Price** : Sort products by price (e.g., low to high, high to low).
  
### WhatsApp integration for rental
  - ** Rent through WhatsApp**: Use the **click-to-chat** API to rent products directly through WhatsApp for a seamless rental experience.
  
## Prerequisities

### **Node.js and npm/yarn installed on your machine **
## Note: It is crucial to have Node.js and npm/yarn installed on your machine to run the project locally. If you don't have them installed, please follow the instructions below:
    -.Install Node.js
    -.Install Yarn (recommended) or use npm

## Run in local

### Clone or pulling from repo

(`git pull/clone https://github.com/Adsyarif/luxelend-client-side.git`)

### Optional

Checkout to determine branch (`git checkout -b feature`)

### Instal Dependency


yarn install

### Run

yarn dev

### Test build/deployment

yarn build  
yarn preview

### Notes:
- **`assets`**: Contains static resources such as documents, icons, and images.
- **`components`**: Reusable React components categorized by their functionality.
  - **`categories`**: Components related to categories.
  - **`common`**: Commonly used UI components.
  - **`Home`**: Components specific to the home page.
  - **`ProductDetail`**: Components for the product detail page.
  - **`Products`**: Components related to product listings and filters.
- **`contexts`**: React contexts for managing global state.
- **`data`**: Static or application-specific data.
- **`pages`**: Components representing different pages in the application.
- **`utils`**: Utility functions and helpers.

## Diagram Architecture

![Product Detail Page](./src/assets/doc/diagramArchitecture.png)


## Future Development Features

### User Membership

- **Login / Register**: Implement functionality for user membership, allowing users to create accounts, log in, and save their preferred products. This feature will enhance the user experience by personalizing interactions and enabling users to track their favorite items. Users will have the ability to securely register, log in, and manage their profile information, providing a personalized shopping experience.

### Transaction History

- **Implementasi Tabel Transaksi**: Add a transaction table to store and display the transaction history of users. This feature will allow users to review their past purchases and track their order history, contributing to better account management and user satisfaction. The transaction history will include details such as order date, items purchased, total amount, and order status, helping users keep track of their shopping activities and manage their expenditures.

### Product Search

- **Implementasi Search Product**: Integrate a search functionality into the header of the application, allowing users to quickly find products they are interested in. This feature will provide users with a search button and a search bar where they can enter keywords to locate specific products. The search functionality will include:
  - **Search Bar**: A user-friendly input field in the header where users can type in search queries.
  - **Real-Time Suggestions**: Display suggestions or autocomplete options as users type to help them find products faster.
  - **Search Results**: Present relevant product results based on the search query, with the ability to filter or sort the results to refine their search.



## Team Developer

Here is the list of our development team members:

Project Team:

1. Muhammad Adrisa Nur Syarif (Frontend Engineer)

Frontend Engineer:

1. Alfath Bagus Kurnia 	
2. Christopher Jordan Lan Garcia
3. Egbert Felica Wibianto
4. Meirth Maulida Hartanti
5. Muhammad Umar
6. Siti Mujayanah					
7. Widia Puspitasari 

Backend Engineer:
1. Desya Saskia Sarbini
2. Widia Puspitasari (support)




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

